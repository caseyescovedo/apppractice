module.exports = {

  // Create Table

  createTable: `
    CREATE TABLE IF NOT EXISTS task (
      id serial PRIMARY KEY,
      item varchar(255) NOT NULL,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `,

  // Tasks

  createTask: `
    INSERT INTO task (item)
    VALUES ($1)
    RETURNING id
  `,

  getTasks: `
    SELECT *
    FROM task
  `,

  deleteTask: `
    DELETE FROM task
    WHERE id = $1
  `,

}
