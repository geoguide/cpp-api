var express = require('express');
var connection = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/players', function(req, res, next) {
  connection.promise().query('SELECT * from players').then(([results, fields]) => {
    res.status(200).send(results);
  });

});

router.get('/tasks/:id', function(req, res, next) {
  const id = req.params.id;
  connection.promise().query(`SELECT * from tasks WHERE id = ${id}`).then(([results, fields]) => {
    if(results.length === 0) res.status(404).send('bad task!');
    res.status(200).send(results[0]);
  });
});

router.post('/tasks/:ben_id', function(req, res, next) {
  const benId = req.params.ben_id;
  const newTask = req.body.new_task;

  if(!benId || ! newTask) return res.status(400).send('no ben');
  const sql = `INSERT INTO tasks (task) VALUES ("${newTask}")`;

  connection.promise().query(sql).then(([result, something]) => {
    const sql2 = `INSERT INTO ben_tasks (ben_id, task_id) VALUES (${benId}, "${result.insertId}")`;
    return connection.promise().query(sql2);
  }).then(result => {
    res.status(200).send('did it');
  }).catch(e => {
    console.error(e);
    res.status(500).send(e);
  });
});

router.get('/tasks', function(req, res, next) {
  connection.promise().query('SELECT * from tasks').then(([results, fields]) => {
    res.status(200).send(results);
  });
});

router.get('/players/:ben_id/remaining-tasks', function(req, res, next) {
  const benId = req.params.ben_id;
  let tasks = [];
  let bentTasks = [];

  if(!benId) return res.status(400).send('no ben');
  connection.promise().query('SELECT * from tasks').then(([results, fields]) => {
    tasks = results;
    return connection.promise().query('SELECT * from ben_tasks WHERE ben_id = '+benId);
  }).then(([results,fields]) => {
    benTasks = results;
    const completedTaskIds = benTasks.map(bt => bt.task_id);
    const remaining = tasks.filter(t => {
      return !completedTaskIds.includes(t.id);
    });
    res.status(200).send(remaining);
  }).catch(e => {
    console.error(e);
  });
});

router.get('/players/:ben_id/completed-tasks', function(req, res, next) {
  const benId = req.params.ben_id;
  let tasks = [];
  let bentTasks = [];

  if(!benId) return res.status(400).send('no ben');
  connection.promise().query('SELECT * from tasks').then(([results, fields]) => {
    tasks = results;
    return connection.promise().query('SELECT b.id, b.ben_id, b.task_id, t.other from ben_tasks b JOIN tasks t WHERE b.ben_id = '+benId);
  }).then(([results,fields]) => {
    benTasks = results;
    const completedTaskIds = benTasks.map(bt => bt.task_id);
    const remaining = tasks.filter(t => {
      return completedTaskIds.includes(t.id);
    });
    res.status(200).send(remaining);
  }).catch(e => {
    console.error(e);
  });
});

router.post('/players/:ben_id/change-name', function(req, res, next) {
  const benId = req.params.ben_id;
  const newName = req.body.new_id;
  let tasks = [];
  let bentTasks = [];

  if(!benId || ! newName) return res.status(400).send('no ben');
  connection.promise().query('UPDATE players SET name = "'+newName+'", changed = 1 WHERE id = '+benId).then(([results, fields]) => {
    res.status(200).send('did it');
  }).catch(e => {
    console.error(e);
  });
});

router.get('/players/:id/dashboard', function(req, res, next) {
  let full = {};
  connection.promise().query('SELECT * from players WHERE id='+req.params.id).then(([results, fields]) => {
    if(results.length === 0) {
      res.status(404).send('did not find ben');
      return;
    }
    full = { ...results[0]};
    const sql = `SELECT DISTINCT b.id, b.ben_id, b.task_id, t.other from ben_tasks b JOIN tasks t ON t.id = b.task_id WHERE b.ben_id = ${full.id}`;
    return connection.promise().query(sql);
  }).then(([results, fields]) => {
    full.tasks = results;
    res.status(200).send(full);
  });
});

router.post('/players/:id/see/:a_id', function(req, res, next) {
  const benId = req.params.id;
  const aId = req.params.a_id;
  const sql = `INSERT INTO ben_achievements (ben_id, achievement_id) VALUES (${benId}, ${aId})`;
  connection.promise().query(sql).then((result) => {
    res.status(200).send(result);
  });
});

router.get('/players/:id', function(req, res, next) {
  connection.promise().query('SELECT * from players WHERE id='+req.params.id).then(([results, fields]) => {
    if(results.length === 0) {
      res.status(404).send('did not find ben');
      return;
    }
    res.status(200).send(results[0]);
  });
});

router.get('/:id/achievements', function(req, res, next) {
  connection.promise().query('SELECT * from ben_achievements WHERE ben_id='+req.params.id).then(([results, fields]) => {
    res.status(200).send(results);
  });
});

router.get('/players/find/:ben', function(req, res, next) {
  const ben = `BEN-${req.params.ben}`;
  connection.promise().query('SELECT * from players WHERE name="'+ben+'"').then(([results, fields]) => {
    if(results.length === 0) {
      res.status(404).send('did not find ben');
      return;
    }
    res.status(200).send(results[0]);
  });
});

router.delete('/players/:id', function(req, res, next) {
  connection.promise().query('DELETE from players WHERE id='+req.params.id).then(([results, fields]) => {
    res.status(200).send('deleted');
  });
});

router.post('/players', function(req, res, next) {
  if(!req.body.name) {
    res.status(400).send('you didn\'t send a name!')
  }
  const nameParts = req.body.name.split('-');
  let paddedName = nameParts[1];
  while(paddedName.length < 3) {
    paddedName = '0'+paddedName;
  }
  const fixedName = nameParts[0]+'-'+paddedName;
  return connection.promise().query('INSERT INTO players (name, actual_name) VALUES  ("'+fixedName+'", "'+req.body.actual_name+'")').then((result) => {
    res.status(200).send(result);
  }).catch(e => {
    console.error(e);
    res.status(500).send(e);
  });
});

router.post('/complete-task', function(req, res, next) {
  if(!req.body.task_id || !req.body.ben_id) {
    res.status(400).send('you didn\'t send a task or a ben!')
  }
  return connection.promise().query('INSERT INTO ben_tasks (ben_id, task_id) VALUES  ('+req.body.ben_id+', '+req.body.task_id+')').then((result) => {
    res.status(200).send(result);
  }).catch(e => {
    console.error(e);
    res.status(500).send(e);
  });
});

module.exports = router;
