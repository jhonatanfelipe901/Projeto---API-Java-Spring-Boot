CREATE TABLE ContaBancaria (
    id INT NOT NULL AUTO_INCREMENT,
    nometitular  VARCHAR(255) NOT NULL,
    saldo INT NOT NULL,
    numeroagencia INT NOT NULL,
	PRIMARY KEY (id)
);