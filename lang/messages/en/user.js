const ErrorMessage = 'Error sending request, request must start with SELECT or INSERT';
const ServerError = 'Error in SQL syntax or denied request';
const DefaultQuery = 'SELECT * FROM patient';
const DefaultInsertButton = 'Insert Default Data';
const SendRequestButton = 'Run SQL';
const defaultInsertSQL = "INSERT INTO patient (name, dateOfBirth) \
        VALUES \
        ('Sara Brown', '1901-01-01'), \
        ('John Smith', '1941-01-01'), \
        ('Jack Ma', '1961-01-30'), \
        ('Elon Musk', '1999-01-01');";