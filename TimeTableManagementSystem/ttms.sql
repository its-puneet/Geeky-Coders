-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2017 at 10:08 AM
-- Server version: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ttms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `name` varchar(30) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`name`, `password`) VALUES
('admin', 'pass123');

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `name` varchar(30) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classrooms`
--

INSERT INTO `classrooms` (`name`, `status`) VALUES
('ML04', 4),
('NL32', 2),
('ML10', 3);

-- --------------------------------------------------------

--
-- Table structure for table `semester3`
--

CREATE TABLE `semester3` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) NOT NULL,
  `period2` varchar(30) NOT NULL,
  `period3` varchar(30) NOT NULL,
  `period4` varchar(30) NOT NULL,
  `period5` varchar(30) NOT NULL,
  `period6` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `semester3`
--

INSERT INTO `semester3` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'AM261<br>SH', 'CO206<br>NA', 'EL211<br>MS', '-<br>-', '-<br>-', '-<br>-, -, -'),
('tuesday', 'CO203<br>SI', 'CO207<br>AMA', 'EL211<br>MS', 'AM261<br>SH', '-<br>-', 'CO293<br>SI, TA, IZ'),
('wednesday', 'CO206<br>NA', 'AM261<br>SH', 'CO207<br>AMA', '-<br>-', '-<br>-', 'CO292<br>AMA, MHK, FA'),
('thursday', 'CO203<br>SI', 'EL211<br>MS', 'CO207<br>AMA', '-<br>-', '-<br>-', 'CO293<br>SI, TA, IZ'),
('friday', 'CO206<br>NA', 'AM261<br>SH', 'CO203<br>SI', '-<br>-', '-<br>-', '-<br>-, -, -'),
('saturday', 'EL211<br>MS', 'CO207<br>AMA', 'CO203<br>SI', 'CO206<br>NA', '-<br>-', 'CO292<br>AMA, MHK, FA');

-- --------------------------------------------------------

--
-- Table structure for table `semester5`
--

CREATE TABLE `semester5` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) NOT NULL,
  `period2` varchar(30) NOT NULL,
  `period3` varchar(30) NOT NULL,
  `period4` varchar(30) NOT NULL,
  `period5` varchar(30) NOT NULL,
  `period6` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `semester5`
--

INSERT INTO `semester5` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'ME340<br>FT', 'CO309<br>AMK', 'CO308<br>IZ', 'CO310<br>FA', '-<br>-', 'CO394<br>RA, MRW, AMA'),
('tuesday', 'EL340<br>MS', 'CO310<br>FA', 'ME340<br>FT', '-<br>-', '-<br>-', 'CO393<br>AMA, FA, RA'),
('wednesday', 'CO309<br>AMK', 'CO308<br>IZ', 'ME340<br>FT', '-<br>-', '-<br>-', '-<br>-, -, -'),
('thursday', 'EL340<br>MS', 'CO310<br>FA', 'CO309<br>AMK', '-<br>-', '-<br>-', 'CO393<br>AMA, FA, RA'),
('friday', 'CO308<br>IZ', 'ME340<br>FT', 'CO309<br>AMK', 'EL340<br>MS', '-<br>-', 'CO394<br>RA, MRW, AMA'),
('saturday', 'CO310<br>FA', 'EL340<br>MS', 'CO308<br>IZ', '-<br>-', '-<br>-', '-<br>-, -, -');

-- --------------------------------------------------------

--
-- Table structure for table `semester7`
--

CREATE TABLE `semester7` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) NOT NULL,
  `period2` varchar(30) NOT NULL,
  `period3` varchar(30) NOT NULL,
  `period4` varchar(30) NOT NULL,
  `period5` varchar(30) NOT NULL,
  `period6` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `semester7`
--

INSERT INTO `semester7` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'CO445<br>MHK', 'CO431<br>RA', 'CO460<br>TA', '-<br>-', '-<br>-', 'CO494<br>IZ, MSU, SB'),
('tuesday', 'CO451<br>AMA', 'CO448<br>NA', 'CO406<br>AMA', 'CO445<br>MHK', '-<br>-', 'CO493<br>NA, MRW, AMK'),
('wednesday', 'CO431<br>RA', 'CO460<br>TA', 'CO445<br>MHK', 'CO451<br>AMA', 'CO448<br>NA', 'CO494<br>IZ, MSU, SB'),
('thursday', 'CO406<br>AMA', 'CO451<br>AMA', 'CO448<br>NA', 'CO431<br>RA', 'CO460<br>TA', 'CO493<br>NA, MRW, AMK'),
('friday', 'CO445<br>MHK', 'CO431<br>RA', 'CO460<br>TA', 'CO406<br>AMA', '-<br>-', '-<br>-, -, -'),
('saturday', 'CO451<br>AMA', 'CO448<br>NA', 'CO406<br>AMA', '-<br>-', '-<br>-', '-<br>-, -, -');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_code` varchar(10) NOT NULL,
  `subject_name` varchar(50) NOT NULL,
  `course_type` varchar(15) NOT NULL,
  `semester` int(1) NOT NULL,
  `department` varchar(50) NOT NULL,
  `isAlloted` int(1) NOT NULL,
  `allotedto` text NOT NULL,
  `allotedto2` text NOT NULL,
  `allotedto3` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_code`, `subject_name`, `course_type`, `semester`, `department`, `isAlloted`, `allotedto`, `allotedto2`, `allotedto3`) VALUES
('CO445', 'Network Security', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T012', '', ''),
('CO451', 'Computer Network Design', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T003', '', ''),
('CO494', 'Embedded  Systems Lab', 'LAB', 7, 'Computer Engg. Dept.', 1, 'T008', 'T001', 'T004'),
('CO493', 'Networking Lab', 'LAB', 7, 'Computer Engg. Dept.', 1, 'T002', 'T007', 'T011'),
('CO394', 'Minor Project', 'LAB', 5, 'Computer Engg. Dept.', 1, 'T005', 'T007', 'T003'),
('CO393', 'Software Lab I', 'LAB', 5, 'Computer Engg. Dept.', 1, 'T003', 'T013', 'T005'),
('CO292', ' Data Structures Lab', 'LAB', 3, 'Computer Engg. Dept.', 1, 'T003', 'T012', 'T013'),
('CO293', 'Programming Lab', 'LAB', 3, 'Computer Engg. Dept.', 1, 'T006', 'T009', 'T008'),
('CO431', 'Internet Tools', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T005', '', ''),
('CO406', 'Compiler Design', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T003', '', ''),
('CO206', 'Logic Theory & Computer Organisation', 'THEORY', 3, 'Computer Engg. Dept.', 1, 'T002', '', ''),
('EL211', 'Electronic Devices & Circuits', 'THEORY', 3, 'Electronics Engg. Dept.', 1, 'T014', '', ''),
('AM261', 'Higher Mathematics', 'THEORY', 3, 'Applied Mathematics Dept.', 1, 'T016', '', ''),
('CO207', 'Data Structures & Algorithm', 'THEORY', 3, 'Computer Engg. Dept.', 1, 'T003', '', ''),
('CO309', 'Microprocessor Theory & Applications', 'THEORY', 5, 'Computer Engg. Dept.', 1, 'T011', '', ''),
('EL340', 'Communication Engineering', 'THEORY', 5, 'Electronics Engg. Dept.', 1, 'T014', '', ''),
('CO308', 'Digital Electronics', 'THEORY', 5, 'Computer Engg. Dept.', 1, 'T008', '', ''),
('CO310', 'Operating Systems', 'THEORY', 5, 'Mechanical Engg. Dept.', 1, 'T013', '', ''),
('ME340', 'Economics & Management', 'THEORY', 5, 'Computer Engg. Dept.', 1, 'T015', '', ''),
('CO448', 'Embedded Systems', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T010', '', ''),
('CO460', 'Computer Architecture', 'THEORY', 7, 'Computer Engg. Dept.', 1, 'T009', '', ''),
('CO203', 'Object Oriented Programming', 'THEORY', 3, 'Computer Engg. Dept.', 1, 'T006', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `t001`
--

CREATE TABLE `t001` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t001`
--

INSERT INTO `t001` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO494'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO494'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t002`
--

CREATE TABLE `t002` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t002`
--

INSERT INTO `t002` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', 'CO206<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO493'),
('wednesday', 'CO206<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO493'),
('friday', 'CO206<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', 'CO206<br>NL32', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t003`
--

CREATE TABLE `t003` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t003`
--

INSERT INTO `t003` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO394'),
('tuesday', 'CO451<br>ML04', 'CO207<br>NL32', 'CO406<br>ML04', '-<br>-', '-<br>-', 'CO393'),
('wednesday', '-<br>-', '-<br>-', 'CO207<br>NL32', 'CO451<br>ML04', '-<br>-', 'CO292'),
('thursday', 'CO406<br>ML04', 'CO451<br>ML04', 'CO207<br>NL32', '-<br>-', '-<br>-', 'CO393'),
('friday', '-<br>-', '-<br>-', '-<br>-', 'CO406<br>ML04', '-<br>-', 'CO394'),
('saturday', 'CO451<br>ML04', 'CO207<br>NL32', 'CO406<br>ML04', '-<br>-', '-<br>-', 'CO292');

-- --------------------------------------------------------

--
-- Table structure for table `t004`
--

CREATE TABLE `t004` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t004`
--

INSERT INTO `t004` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO494'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO494'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t005`
--

CREATE TABLE `t005` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t005`
--

INSERT INTO `t005` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', 'CO431<br>ML04', '-<br>-', '-<br>-', '-<br>-', 'CO394'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO393'),
('wednesday', 'CO431<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', 'CO431<br>ML04', '-<br>-', 'CO393'),
('friday', '-<br>-', 'CO431<br>ML04', '-<br>-', '-<br>-', '-<br>-', 'CO394'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t006`
--

CREATE TABLE `t006` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t006`
--

INSERT INTO `t006` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', 'CO203<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO293'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', 'CO203<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO293'),
('friday', '-<br>-', '-<br>-', 'CO203<br>NL32', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', 'CO203<br>NL32', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t007`
--

CREATE TABLE `t007` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t007`
--

INSERT INTO `t007` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO394'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO493'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO493'),
('friday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO394'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t008`
--

CREATE TABLE `t008` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t008`
--

INSERT INTO `t008` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', 'CO308<br>ML10', '-<br>-', '-<br>-', 'CO494'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO293'),
('wednesday', '-<br>-', 'CO308<br>ML10', '-<br>-', '-<br>-', '-<br>-', 'CO494'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO293'),
('friday', 'CO308<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', 'CO308<br>ML10', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t009`
--

CREATE TABLE `t009` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t009`
--

INSERT INTO `t009` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', 'CO460<br>ML04', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO293'),
('wednesday', '-<br>-', 'CO460<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO460<br>ML04', 'CO293'),
('friday', '-<br>-', '-<br>-', 'CO460<br>ML04', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t010`
--

CREATE TABLE `t010` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t010`
--

INSERT INTO `t010` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', 'CO448<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO448<br>ML04', '-'),
('thursday', '-<br>-', '-<br>-', 'CO448<br>ML04', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', 'CO448<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t011`
--

CREATE TABLE `t011` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t011`
--

INSERT INTO `t011` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', 'CO309<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO493'),
('wednesday', 'CO309<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', 'CO309<br>ML10', '-<br>-', '-<br>-', 'CO493'),
('friday', '-<br>-', '-<br>-', 'CO309<br>ML10', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t012`
--

CREATE TABLE `t012` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t012`
--

INSERT INTO `t012` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'CO445<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', 'CO445<br>ML04', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', 'CO445<br>ML04', '-<br>-', '-<br>-', 'CO292'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', 'CO445<br>ML04', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO292');

-- --------------------------------------------------------

--
-- Table structure for table `t013`
--

CREATE TABLE `t013` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t013`
--

INSERT INTO `t013` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', '-<br>-', 'CO310<br>ML10', '-<br>-', '-'),
('tuesday', '-<br>-', 'CO310<br>ML10', '-<br>-', '-<br>-', '-<br>-', 'CO393'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO292'),
('thursday', '-<br>-', 'CO310<br>ML10', '-<br>-', '-<br>-', '-<br>-', 'CO393'),
('friday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', 'CO310<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-<br>-', 'CO292');

-- --------------------------------------------------------

--
-- Table structure for table `t014`
--

CREATE TABLE `t014` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t014`
--

INSERT INTO `t014` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', '-<br>-', '-<br>-', 'EL211<br>NL32', '-<br>-', '-<br>-', '-'),
('tuesday', 'EL340<br>ML10', '-<br>-', 'EL211<br>NL32', '-<br>-', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', 'EL340<br>ML10', 'EL211<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', '-<br>-', '-<br>-', 'EL340<br>ML10', '-<br>-', '-'),
('saturday', 'EL211<br>NL32', 'EL340<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t015`
--

CREATE TABLE `t015` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t015`
--

INSERT INTO `t015` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'ME340<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', 'ME340<br>ML10', '-<br>-', '-<br>-', '-'),
('wednesday', '-<br>-', '-<br>-', 'ME340<br>ML10', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', 'ME340<br>ML10', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t016`
--

CREATE TABLE `t016` (
  `day` varchar(10) NOT NULL,
  `period1` varchar(30) DEFAULT NULL,
  `period2` varchar(30) DEFAULT NULL,
  `period3` varchar(30) DEFAULT NULL,
  `period4` varchar(30) DEFAULT NULL,
  `period5` varchar(30) DEFAULT NULL,
  `period6` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t016`
--

INSERT INTO `t016` (`day`, `period1`, `period2`, `period3`, `period4`, `period5`, `period6`) VALUES
('monday', 'AM261<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('tuesday', '-<br>-', '-<br>-', '-<br>-', 'AM261<br>NL32', '-<br>-', '-'),
('wednesday', '-<br>-', 'AM261<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-'),
('thursday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-'),
('friday', '-<br>-', 'AM261<br>NL32', '-<br>-', '-<br>-', '-<br>-', '-'),
('saturday', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-<br>-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `faculty_number` varchar(10) NOT NULL,
  `name` text NOT NULL,
  `alias` varchar(10) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `emailid` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`faculty_number`, `name`, `alias`, `designation`, `contact_number`, `emailid`) VALUES
('T016', 'Prof. Shamshad Husain', 'SH', 'Professor', '12345678', 'shamshadhusain@gmail.com'),
('T015', 'Dr. Faisal Talib', 'FT', 'Associate Professor', '12345678', 'faisaltalib@gmail.com'),
('T014', 'Dr. Mohd. Sharique', 'MS', 'Assistant Professor', '12345678', 'mohdsharique@gmail.com'),
('T013', 'Mr. Faisal Alam', 'FA', 'Assistant Professor', '12345678', 'faisalalam@gmail.com'),
('T011', 'Mr. Asad Mohammed Khan', 'AMK', 'Assistant Professor', '12345678', 'asadmohammedkhan@gmail.com'),
('T012', 'Mr. Muneeb Hasan Khan', 'MHK', 'Assistant Professor', '12345678', 'muneebhasankhan@gmail.com'),
('T007', 'Mr. Misbahur Rahman Warsi', 'MRW', 'Associate Professor', '12345678', 'mrwarsi@gmail.com'),
('T008', 'Mr. Izharauddin', 'IZ', 'Associate Professor', '12345678', 'izharuddin@gmail.com'),
('T009', 'Mr. Tameem Ahmad', 'TA', 'Assistant Professor', '12345678', 'tameemahmad@gmail.com'),
('T010', 'Mr. Nadeem Akhtar', 'NA', 'Assistant Professor', '12345678', 'nadeemakhtar@gmail.com'),
('T006', 'Dr. Saiful Islam', 'SI', 'Associate Professor', '12345678', 'saifulislam@gmail.com'),
('T005', 'Dr. Rashid Ali', 'RA', 'Associate Professor', '12345678', 'rashidali@gmail.com'),
('T004', 'Prof. M.M. Sufyan Beg', 'SB', 'Professor', '12345678', 'mmsufyanbeg@gmail.com'),
('T002', 'Prof. Nesar Ahmad', 'NA', 'Professor', '12345678', 'nesarahmad@gmail.com'),
('T003', 'Prof. Ash Mohammad Abbas', 'AMA', 'Professor', '12345678', 'ashmabbas@gmail.com'),
('T001', 'Prof. Mohammad Sarosh Umar', 'MSU', 'Professor', '12345678', 'saroshumar@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `semester3`
--
ALTER TABLE `semester3`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `semester5`
--
ALTER TABLE `semester5`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `semester7`
--
ALTER TABLE `semester7`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_code`);

--
-- Indexes for table `t001`
--
ALTER TABLE `t001`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t002`
--
ALTER TABLE `t002`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t003`
--
ALTER TABLE `t003`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t004`
--
ALTER TABLE `t004`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t005`
--
ALTER TABLE `t005`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t006`
--
ALTER TABLE `t006`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t007`
--
ALTER TABLE `t007`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t008`
--
ALTER TABLE `t008`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t009`
--
ALTER TABLE `t009`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t010`
--
ALTER TABLE `t010`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t011`
--
ALTER TABLE `t011`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t012`
--
ALTER TABLE `t012`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t013`
--
ALTER TABLE `t013`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t014`
--
ALTER TABLE `t014`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t015`
--
ALTER TABLE `t015`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `t016`
--
ALTER TABLE `t016`
  ADD PRIMARY KEY (`day`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`faculty_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
