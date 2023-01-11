-- Procedure get_all_customers()

DROP PROCEDURE IF EXISTS get_all_customers;

DELIMITER ;;

CREATE PROCEDURE get_all_customers()
 BEGIN

    SELECT surname,lastname,adress,billing_adress,username,email,balance,status,klarna
    FROM customer
    WHERE deleted = 0;

  END
;;

DELIMITER ;

-- Procedure get_customer_by_username()

DROP PROCEDURE IF EXISTS get_customer_by_username;

DELIMITER ;;

CREATE PROCEDURE get_customer_by_username(
                    `a_username` VARCHAR(50)
)
 BEGIN

   SELECT surname,lastname,adress,billing_adress,username,email,balance,status,klarna
     FROM customer
    WHERE username = a_username AND deleted = 0;


  END
;;

DELIMITER ;

-- Procedure update_customer_info()

DROP PROCEDURE IF EXISTS update_customer_info;

DELIMITER ;;

CREATE PROCEDURE update_customer_info(
                    `a_username` VARCHAR(50),
                    `a_surname` VARCHAR(50),
                    `a_lastname` VARCHAR(50),
                    `a_adress` VARCHAR(50),
                    `a_billing_adress` VARCHAR(50),
                    `a_email` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      surname = a_surname,
      lastname = a_lastname,
      adress = a_adress,
      billing_adress = a_billing_adress,
      email = a_email
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_password()

DROP PROCEDURE IF EXISTS update_customer_password;

DELIMITER ;;

CREATE PROCEDURE update_customer_password(
                    `a_username` VARCHAR(50),
                    `a_password` VARCHAR(250)
)
 BEGIN

   UPDATE customer
   SET
      password = a_password
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_balance()

DROP PROCEDURE IF EXISTS update_customer_balance;

DELIMITER ;;

CREATE PROCEDURE update_customer_balance(
                    `a_username` VARCHAR(50),
                    `a_value` INT
)
 BEGIN

   UPDATE customer
   SET
      balance = balance + a_value
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure set_customer_klarna()

DROP PROCEDURE IF EXISTS set_customer_klarna;

DELIMITER ;;

CREATE PROCEDURE set_customer_klarna(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      klarna = true
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure remove_customer_klarna()

DROP PROCEDURE IF EXISTS remove_customer_klarna;

DELIMITER ;;

CREATE PROCEDURE remove_customer_klarna(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      klarna = false
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure delete_customer()

DROP PROCEDURE IF EXISTS delete_customer;

DELIMITER ;;

CREATE PROCEDURE delete_customer(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      deleted = true
    WHERE username = a_username;


  END
;;

DELIMITER ;
