CREATE TABLE demo
(
  id int(11) NOT NULL AUTO_INCREMENT,
  text varchar(50) NOT NULL comment '文本',
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP comment '创建时间',
  PRIMARY KEY (id)
) engine=innodb DEFAULT CHARSET=utf8mb4  comment 'demo';