<?php

/**Class to store subject details**/
class Subject
{
    public $code; //Subject code
    public $classes = 0; //No. of classes
    public $semester; //semester of subject
    public $alias; //alias for subject teacher
    public $alias2; //alias for subject teacher2 (only for practical subjects)
    public $alias3; //alias for subject teacher3 (only for practical subjects)
    public $subjectteacher; //faculty number of teacher1
    public $subjectteacher2; //faculty number of teacher2
    public $subjectteacher3; //faculty number of teacher3
}

/**Class to store teachers details**/
class Teacher
{
    public $id; //faculty number
    public $days = array(); //schedule
    public $classroom_names = array(); //classroom names
}

$subjectslots = array(); //subjects slots for all semesters
$aliasslots = array(); //alias slots corresponding to each subject

$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM subjects ");
$subjects[] = new Subject(); //to store theory subjects
$practicals[] = new Subject(); //to store practical subjects

$count = 0;

/** fetching theory subjects and saving in subjects array*/
while ($row = mysqli_fetch_assoc($query)) {
    if ($row['course_type'] == 'LAB')
        continue;
    $temp = new Subject();
    $temp->code = $row['subject_code'];
    $temp->semester = $row['semester'];
    $temp->subjectteacher = $row['allotedto'];
    if (isset($temp->subjectteacher)) {
        $teacheralias_query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
            "SELECT * FROM teachers WHERE faculty_number='$temp->subjectteacher'");
        $row = mysqli_fetch_assoc($teacheralias_query);
        $temp->alias = $row['alias'];
    }
    $subjects[$count++] = $temp;
}
$subjects_count = $count;
/**Fetching teachers and saving into teachers array*/
$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM teachers ");

$teachers[] = new Teacher();
$count = 0;
while ($row = mysqli_fetch_assoc($query)) {
    $temp = new Teacher();
    $temp->id = $row['faculty_number'];
    $teachers[$count++] = $temp;
}
$teachers_count = $count;
$r = -1;

/** Genrating timetable for theory courses, with maximum class for each subject equal to 4 */
for ($I = 0; $I < $subjects_count * 4; $I++) {
    $i = $I % $subjects_count;
    $sem = $subjects[$i]->semester;
    $year = ($sem + 1) / 2;
    $classroom_query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
        "SELECT name FROM classrooms WHERE status='$year'");
    $row = mysqli_fetch_assoc($classroom_query);
    $classroom = $row['name'];
    for ($j = 0; $j < 30; $j++) {
        $subject_teacher;
        for ($z = 0; $z < $count; $z++) {
            if ($teachers[$z]->id == $subjects[$i]->subjectteacher) {
                $tindex = $z;
                break;
            }
        }
        if ($j % 6 == 0)
            $r++;
        if (isset($subjectslots[$sem][$r % 6][$j % 5])) {
            //check if subjectslot is empty
            continue;
        } else if (isset($teachers[$tindex]->days[$sem % 2][$r % 6][$j % 5])) {
            //check if subject teacher is free
            continue;
        } else {
            //check if existing in same day
            $already = false;
            for ($z = 0; $z < 5; $z++) {
                if (isset($subjectslots[$sem][$r % 6][$z])) {
                    if ($z == ($j % 5)) {
                        continue;
                    }
                    if ($subjectslots[$sem][$r % 6][$z] == $subjects[$i]->code) {
                        $already = true;
                    }
                }
            }
            if ($already) {
                continue;
            }
            // set subject
            $subjects[$i]->classes++;
            $subjectslots[$sem][$r % 6][$j % 5] = $subjects[$i]->code;
            $aliasslots[$sem][$r % 6][$j % 5][0] = $subjects[$i]->alias;
            $teachers[$tindex]->days[$sem % 2][$r % 6][$j % 5] = $subjects[$i]->code;
            $teachers[$tindex]->classroom_names[$sem % 2][$r % 6][$j % 5] = $classroom;
            break;
        }
    }
}
/**********************check for empty slots in semester's timetable*******************************/
for ($i = 3; $i < 9; $i += 2) {
    for ($k = 0; $k < 6; $k++) {
        for ($j = 0; $j < 5; $j++) {

            if (isset($subjectslots[$i][$k][$j % 5])) {
            } else {
                $subjectslots[$i][$k][$j % 5] = "-";
                $aliasslots[$i][$k][$j % 5][0] = "-";
            }

        }
    }
}
/**********************check for empty slots in teacher's timetable*******************************/
for ($i = 0; $i < $count; $i++) {
    for ($k = 0; $k < 6; $k++) {
        for ($j = 0; $j < 5; $j++) {

            if (isset($teachers[$i]->days[1][$k][$j])) {
            } else {
                $teachers[$i]->days[1][$k][$j] = "-";
                $teachers[$i]->classroom_names[1][$k][$j] = "-";
            }
        }
    }
}
/**Fetching info of practical courses **/

$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM subjects ");
$count = 0;
while ($row = mysqli_fetch_assoc($query)) {
    if (!($row['course_type'] == 'LAB'))
        continue;
    $temp = new Subject();
    $temp->code = $row['subject_code'];
    $temp->semester = $row['semester'];
    $temp->subjectteacher = $row['allotedto'];
    $temp->subjectteacher2 = $row['allotedto2'];
    $temp->subjectteacher3 = $row['allotedto3'];
    $teacheralias_query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
        "SELECT * FROM teachers WHERE faculty_number='$temp->subjectteacher'");
    $row = mysqli_fetch_assoc($teacheralias_query);
    $temp->alias = $row['alias'];
    $teacheralias_query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
        "SELECT * FROM teachers WHERE faculty_number='$temp->subjectteacher2'");
    $row = mysqli_fetch_assoc($teacheralias_query);
    $temp->alias2 = $row['alias'];
    $teacheralias_query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
        "SELECT * FROM teachers WHERE faculty_number='$temp->subjectteacher3'");
    $row = mysqli_fetch_assoc($teacheralias_query);
    $temp->alias3 = $row['alias'];
    $practicals[$count++] = $temp;
}
for ($I = 0; $I < 2 * $count; $I++) {
    $i = $I % $count;
    $sem = $practicals[$i]->semester;
    $tindex = -1;
    $tindex2 = -1;
    $tindex3 = -1;
    for ($z = 0; $z < $teachers_count; $z++) {
        if (isset($practicals[$i]->subjectteacher)) {
            if ($teachers[$z]->id == $practicals[$i]->subjectteacher) {
                $tindex = $z;
            }
        }
        if (isset($practicals[$i]->subjectteacher2)) {
            if ($teachers[$z]->id == $practicals[$i]->subjectteacher2) {
                $tindex2 = $z;
            }
        }
        if (isset($practicals[$i]->subjectteacher3)) {
            if ($teachers[$z]->id == $practicals[$i]->subjectteacher3) {
                $tindex3 = $z;
            }
        }
    }

    //checking if all three teachers are free
    for ($j = 0; $j < 6; $j++) {
        if (isset($subjectslots[$sem][$j][5])) {
            continue;
        } else if (isset($teachers[$tindex]->days[$sem % 2][$j][5]) || isset($teachers[$tindex2]->days[$sem % 2][$j][5]) ||
            isset($teachers[$tindex3]->days[$sem % 2][$j][5])
        ) {
            continue;
        } else {
            //if free then assign practical
            $practicals[$i]->classes++;
            $subjectslots[$sem][$j][5] = $practicals[$i]->code;
            $aliasslots[$sem][$j][5][0] = $practicals[$i]->alias;
            $aliasslots[$sem][$j][5][1] = $practicals[$i]->alias2;
            $aliasslots[$sem][$j][5][2] = $practicals[$i]->alias3;
            $teachers[$tindex]->days[$sem % 2][$j][5] = $practicals[$i]->code;
            $teachers[$tindex2]->days[$sem % 2][$j][5] = $practicals[$i]->code;
            $teachers[$tindex3]->days[$sem % 2][$j][5] = $practicals[$i]->code;
            break;
        }
    }
}

/**checks for empty slot**/
for ($i = 3; $i < 9; $i += 2) {
    for ($j = 0; $j < 6; $j++) {
        if (isset($subjectslots[$i][$j][5])) {}
        else {
            $subjectslots[$i][$j][5] = '-';
            $aliasslots[$i][$j][5][0] = '-';
            $aliasslots[$i][$j][5][1] = '-';
            $aliasslots[$i][$j][5][2] = '-';
        }
    }
}

for ($i = 0; $i < $teachers_count; $i++) {
    for ($k = 0; $k < 6; $k++) {

        if (isset($teachers[$i]->days[1][$k][5])) {}
        else {
            $teachers[$i]->days[1][$k][5] = "-";
        }
    }
}


/******Saving semesters timetable into database*****/
$days = array('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
for ($i = 3; $i < 9; $i += 2) {
    $database_name = " semester" . $i . " ";
    for ($j = 0; $j < 6; $j++) {
        $query = "UPDATE" . $database_name . " SET  period1= '" . $subjectslots[$i][$j][0] . "<br>" . $aliasslots[$i][$j][0][0] . "',
period2='" . $subjectslots[$i][$j][1] . "<br>" . $aliasslots[$i][$j][1][0] . "', 
period3='" . $subjectslots[$i][$j][2] . "<br>" . $aliasslots[$i][$j][2][0] . "',
period4='" . $subjectslots[$i][$j][3] . "<br>" . $aliasslots[$i][$j][3][0] . "', 
period5='" . $subjectslots[$i][$j][4] . "<br>" . $aliasslots[$i][$j][4][0] . "',
period6='" . $subjectslots[$i][$j][5] . "<br>" . $aliasslots[$i][$j][5][0] . ", " . $aliasslots[$i][$j][5][1] . ", " . $aliasslots[$i][$j][5][2] . "'
 WHERE day='" . $days[$j] . "' ";
        $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), $query);
    }

}
/******Saving teachers timetable into database*****/
for ($i = 0; $i < $teachers_count; $i++) {
    $database_name = " " . strtolower($teachers[$i]->id) . " ";
    for ($j = 0; $j < 6; $j++) {
        $query = "UPDATE" . $database_name . " SET  period1= '" . $teachers[$i]->days[1][$j][0] . "<br>" . $teachers[$i]->classroom_names[1][$j][0] . "',
period2='" . $teachers[$i]->days[1][$j][1] . "<br>" . $teachers[$i]->classroom_names[1][$j][1] . "', 
period3='" . $teachers[$i]->days[1][$j][2] . "<br>" . $teachers[$i]->classroom_names[1][$j][2] . "',
period4='" . $teachers[$i]->days[1][$j][3] . "<br>" . $teachers[$i]->classroom_names[1][$j][3] . "', 
period5='" . $teachers[$i]->days[1][$j][4] . "<br>" . $teachers[$i]->classroom_names[1][$j][4] . "',
period6='" . $teachers[$i]->days[1][$j][5] . "'
 WHERE day='" . $days[$j] . "' ";
        $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), $query);
    }
}

/******redirect back to generate timetable **/
header("Location:generatetimetable.php?success=true");

?>