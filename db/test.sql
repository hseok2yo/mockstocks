-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: mockstocks
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ai_holding`
--

DROP TABLE IF EXISTS `ai_holding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_holding` (
  `ai_persona_id` bigint(20) NOT NULL COMMENT '소속 AI 페르소나',
  `avg_price` bigint(20) NOT NULL COMMENT '평단가',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` bigint(20) NOT NULL COMMENT '보유 수량',
  `stock_id` bigint(20) NOT NULL COMMENT '보유 종목',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKj5tyf1oce6bwe5tg4j1wxjy6d` (`ai_persona_id`,`stock_id`),
  KEY `FKo7614d2voitywix49lqw6mjsc` (`stock_id`),
  CONSTRAINT `FKo7614d2voitywix49lqw6mjsc` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`),
  CONSTRAINT `FKpyy6ar2d7migqdsyr1e60p160` FOREIGN KEY (`ai_persona_id`) REFERENCES `ai_persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='AI 페르소나별 종목 보유현황 (Holding과 동일 구조)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_holding`
--

LOCK TABLES `ai_holding` WRITE;
/*!40000 ALTER TABLE `ai_holding` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_holding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_persona`
--

DROP TABLE IF EXISTS `ai_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_persona` (
  `cash_balance` bigint(20) NOT NULL COMMENT 'AI 현금 잔고',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `seed_money` bigint(20) NOT NULL COMMENT '초기 시드머니 (유저와 동일 조건)',
  `tag` varchar(20) NOT NULL COMMENT '화면 표시용 태그, 예: VALUE',
  `name` varchar(30) NOT NULL COMMENT '캐릭터 이름, 예: 벤저민',
  `description` varchar(200) NOT NULL COMMENT '캐릭터 소개 문구',
  `style` enum('CONTRARIAN','GROWTH','MOMENTUM','VALUE') NOT NULL COMMENT '투자 스타일 (VALUE/GROWTH/MOMENTUM/CONTRARIAN)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKb57gwmrll6xxph670fnla4pga` (`style`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='AI 투자자 캐릭터 (User의 AI버전)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_persona`
--

LOCK TABLES `ai_persona` WRITE;
/*!40000 ALTER TABLE `ai_persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ai_transaction`
--

DROP TABLE IF EXISTS `ai_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_transaction` (
  `ai_persona_id` bigint(20) NOT NULL COMMENT '소속 AI 페르소나',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `price` bigint(20) NOT NULL COMMENT '체결 당시 가격',
  `quantity` bigint(20) NOT NULL COMMENT '체결 수량',
  `stock_id` bigint(20) NOT NULL COMMENT '거래 종목',
  `traded_at` datetime(6) DEFAULT NULL COMMENT '체결 시각',
  `comment` varchar(500) DEFAULT NULL COMMENT 'AI가 생성한 매매 사유 코멘트',
  `type` enum('BUY','SELL') NOT NULL COMMENT 'BUY 또는 SELL',
  PRIMARY KEY (`id`),
  KEY `FK16k7i1gj1sknh5mme8wco5h76` (`ai_persona_id`),
  KEY `FKab1qcojp3go8myh7sseunkkab` (`stock_id`),
  CONSTRAINT `FK16k7i1gj1sknh5mme8wco5h76` FOREIGN KEY (`ai_persona_id`) REFERENCES `ai_persona` (`id`),
  CONSTRAINT `FKab1qcojp3go8myh7sseunkkab` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='AI 페르소나 매매 로그 (Claude API 코멘트 저장)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_transaction`
--

LOCK TABLES `ai_transaction` WRITE;
/*!40000 ALTER TABLE `ai_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holding`
--

DROP TABLE IF EXISTS `holding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holding` (
  `avg_price` bigint(20) NOT NULL COMMENT '평단가 (매수 시 가중평균 재계산)',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `portfolio_id` bigint(20) NOT NULL COMMENT '소속 포트폴리오',
  `quantity` bigint(20) NOT NULL COMMENT '보유 수량',
  `stock_id` bigint(20) NOT NULL COMMENT '보유 종목',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKo3vm58cs9xk8apg0je3326ilp` (`portfolio_id`,`stock_id`),
  KEY `FKqlxoca69ldhippmpy4oo45f0x` (`stock_id`),
  CONSTRAINT `FKfqqg206xn23hpk2h0432i8erf` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`),
  CONSTRAINT `FKqlxoca69ldhippmpy4oo45f0x` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='포트폴리오별 종목 보유현황 (portfolio_id+stock_id 유니크)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holding`
--

LOCK TABLES `holding` WRITE;
/*!40000 ALTER TABLE `holding` DISABLE KEYS */;
/*!40000 ALTER TABLE `holding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `cash_balance` bigint(20) NOT NULL COMMENT '매매 가능한 현금 잔고',
  `created_at` datetime(6) DEFAULT NULL COMMENT '생성일시',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `seed_money` bigint(20) NOT NULL COMMENT '초기 지급 시드머니, 수익률 계산 기준값',
  `user_id` bigint(20) NOT NULL COMMENT '소유 유저',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKc7fv45hgmubvas83vp5ikuo0i` (`user_id`),
  CONSTRAINT `FKclxr2fqkko1a1kjw4pvijvej3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='포트폴리오 (User:Portfolio = 1:1)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `change_pct` double NOT NULL COMMENT '등락률(%)',
  `current_price` bigint(20) NOT NULL COMMENT '현재가',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `price_updated_at` datetime(6) DEFAULT NULL COMMENT '마지막 시세 갱신 시각',
  `code` varchar(10) NOT NULL COMMENT '종목코드, 예: 005930',
  `name` varchar(50) NOT NULL COMMENT '종목명, 예: 삼성전자',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8pbyo6rdbktdur7u8vpc9r27n` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='종목 마스터 (모든 유저/AI 공유)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `portfolio_id` bigint(20) NOT NULL COMMENT '소속 포트폴리오',
  `price` bigint(20) NOT NULL COMMENT '체결 당시 가격',
  `quantity` bigint(20) NOT NULL COMMENT '체결 수량',
  `stock_id` bigint(20) NOT NULL COMMENT '거래 종목',
  `traded_at` datetime(6) DEFAULT NULL COMMENT '체결 시각',
  `type` enum('BUY','SELL') NOT NULL COMMENT 'BUY 또는 SELL',
  PRIMARY KEY (`id`),
  KEY `FKha1jsk2ef5wtosemt1vdtx24q` (`portfolio_id`),
  KEY `FKlhqnenc4bwsw1v2vit8ohoffj` (`stock_id`),
  CONSTRAINT `FKha1jsk2ef5wtosemt1vdtx24q` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`),
  CONSTRAINT `FKlhqnenc4bwsw1v2vit8ohoffj` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='매수/매도 체결 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `birth_date` date NOT NULL COMMENT '생년월일',
  `created_at` datetime(6) DEFAULT NULL COMMENT '가입일시',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(20) NOT NULL COMMENT '휴대폰번호',
  `nickname` varchar(30) NOT NULL COMMENT '화면 표시 닉네임',
  `username` varchar(30) NOT NULL COMMENT '사용자 이름 (실명)',
  `user_id` varchar(50) NOT NULL COMMENT '로그인 아이디 ',
  `email` varchar(255) NOT NULL COMMENT '이메일',
  `password` varchar(255) NOT NULL COMMENT '암호화된 비밀번호',
  `role` enum('ADMIN','USER') DEFAULT NULL COMMENT '권한 (USER/ADMIN)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4bgmpi98dylab6qdvf9xyaxu4` (`phone_number`),
  UNIQUE KEY `UKa3imlf41l37utmxiquukk8ajc` (`user_id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='사용자';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2020-02-02',NULL,1,'01021657589','hello','hellokity','hellokity','hyungseok758@naver.com','1234','ADMIN'),('1111-11-11','2026-07-24 06:00:26.000000',3,'01021657581','닉네이','홍길동','hellokity1','hyungseok7581@naver.com','$2a$10$5quF4izysz0p5ManqNrQB.DLkmeMc.icn4XntzdauC1MW8wXeDQBK','USER'),('1111-11-11','2026-07-24 06:14:24.000000',5,'01021657580','닉넴','길동','hellokity12','hyungseok75@naver.com','$2a$10$LIkAwW5rSeRUxNn0C2ygSev2sLvbRIvST//GDi0z3pKEz0UlTDPQO','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_agreements`
--

DROP TABLE IF EXISTS `user_agreements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_agreements` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `user_id` bigint(20) NOT NULL COMMENT '사용자 ID (User 테이블 FK)',
  `agreement_type` varchar(50) NOT NULL COMMENT '동의 항목 종류 (service, privacy, finance, marketing 등)',
  `is_agreed` tinyint(1) NOT NULL COMMENT '동의 여부',
  `agreed_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '동의한 시각',
  `terms_version` varchar(20) DEFAULT NULL COMMENT '동의 시점의 약관 버전',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_agreements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_agreements`
--

LOCK TABLES `user_agreements` WRITE;
/*!40000 ALTER TABLE `user_agreements` DISABLE KEYS */;
INSERT INTO `user_agreements` VALUES (1,3,'service',1,'2026-07-23 21:00:26',NULL),(2,3,'privacy',1,'2026-07-23 21:00:26',NULL),(3,3,'finance',1,'2026-07-23 21:00:26',NULL),(4,3,'marketing',1,'2026-07-23 21:00:26',NULL),(5,5,'service',1,'2026-07-23 21:14:24','v1.0'),(6,5,'privacy',1,'2026-07-23 21:14:24','v1.0'),(7,5,'finance',1,'2026-07-23 21:14:24','v1.0'),(8,5,'marketing',0,'2026-07-23 21:14:24','v1.0');
/*!40000 ALTER TABLE `user_agreements` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-24  6:31:37
