/*Courses*/
INSERT INTO `scheduleDb`.`courses` (`course`) VALUES ('Rakendusinformaatika 1. kursus');
INSERT INTO `scheduleDb`.`courses` (`course`) VALUES ('Rakendusinformaatika 2. kursus');
INSERT INTO `scheduleDb`.`courses` (`course`) VALUES ('Liiklusohutus 3. kursus');

/*Lecturers*/
INSERT INTO `scheduleDb`.`lecturers` (`firstName`, `lastName`, `email`) VALUES ('Inga', 'Petuhhov', 'inga@inga.ee');
INSERT INTO `scheduleDb`.`lecturers` (`firstName`, `lastName`, `email`) VALUES ('Martti', 'Raavel', 'martti@martti.ee');
INSERT INTO `scheduleDb`.`lecturers` (`firstName`, `lastName`, `email`) VALUES ('Liina', 'Viiret', 'liina@liina.ee');

/*Subjects*/
INSERT INTO `scheduleDb`.`subjects` (`subject`, `subjectCode`, `creditPoint`) VALUES ('Programmeerimis alused', 'HKI5025.HK', '5');
INSERT INTO `scheduleDb`.`subjects` (`subject`, `subjectCode`, `creditPoint`) VALUES ('Programmeerimine II', 'HKI5003.HK', '3');
INSERT INTO `scheduleDb`.`subjects` (`subject`, `subjectCode`, `creditPoint`) VALUES ('Uurimistöö I', 'HKL5100.HK', '3');

/*LecturersHasSubjects*/

INSERT INTO `scheduleDb`.`lecturers_has_subjects` (`lecturers_id`, `subjects_id`) VALUES ('1', '1');
INSERT INTO `scheduleDb`.`lecturers_has_subjects` (`lecturers_id`, `subjects_id`) VALUES ('2', '2');
INSERT INTO `scheduleDb`.`lecturers_has_subjects` (`lecturers_id`, `subjects_id`) VALUES ('2', '3');
INSERT INTO `scheduleDb`.`lecturers_has_subjects` (`lecturers_id`, `subjects_id`) VALUES ('3', '3');

/*Rooms*/
INSERT INTO `scheduleDb`.`rooms` (`room`) VALUES ('Auditoorium 106');
INSERT INTO `scheduleDb`.`rooms` (`room`) VALUES ('Arvutilabor 203');
INSERT INTO `scheduleDb`.`rooms` (`room`) VALUES ('Arvutilabor 205');

/*Scheduled*/
INSERT INTO `scheduleDb`.`scheduled` (`startTime`, `endTime`, `rooms_id`, `courses_id`, `subjects_id`) VALUES ('2023-01-31 10:00:00', '2023-01-31 13:15:00', '2', '1', '1');
INSERT INTO `scheduleDb`.`scheduled` (`startTime`, `endTime`, `comment`, `courses_id`, `subjects_id`) VALUES ('2023-01-30 14:15:00', '2023-01-30 17:30:00', 'Ei tea kas toimub', '3', '3');
INSERT INTO `scheduleDb`.`scheduled` (`startTime`, `endTime`, `rooms_id`, `courses_id`, `subjects_id`) VALUES ('2022-02-21 10:00:00', '2022-02-21 13:00:00', '3', '2', '2');
