// Movie Ticket Booking System

#include<iostream>
#include<cstdio>
#include<fstream>
#include<sstream>
#include<string>
#include<cstdlib>
#include<conio.h>
#include<windows.h>
#include<mysql.h>
using namespace std;

int qstate;
MYSQL* conn;
MYSQL_ROW row;
MYSQL_RES* res;
// Global Variable End

class db_response
{
public:
    static void ConnectionFunction()
    {
        conn = mysql_init(0);
        if (conn)
        {
            cout << "Database Connected" << endl;
            cout << "Press any key to continue..." << endl;
            // getch();
            system("cls");
        }
        else
            cout << "Failed To Connect!" << mysql_errno(conn) << endl;
        conn = mysql_real_connect(conn, "localhost", "root", "", "cpp_movieticketbookingsystem", 0, NULL, 0);
        if (conn)
        {
            cout << "Database Connected To MySql" << conn << endl;
            cout << "Press any key to continue..." << endl;
            // getch();
            system("cls");
        }
        else
            cout << "Failed To Connect!" << mysql_errno(conn) << endl;
    }
};

void Welcome() {
    cout << "Welcome To Movie Ticket Booking System" << endl << endl;
    cout << "Menu" << endl;
}

// Fucntions
void BookTicket();
void ShowMyTicket();
void CheckSeat();
void ReserveSeat();
void AddNewMovie();
void EditMovie();
void DeleteMovie();
void ShowMovieList();

int main()
{
    // Initial Load
    system("cls");
    system("title Movie Ticket Booking System");
    system("color 0f");
    // Initial Load End

    // Call Methods
    db_response::ConnectionFunction();
    // Call Methods End

    // Variables
    int chooseOneFromMenu = 0;
    char exitSurity;
    int num = 1;
    int fin = 0;
    // Variables End

    Welcome();
    for (int i = 0; i < 1; i++) {
        fin = num;
        cout << fin << ". Book Ticket" << endl;
        fin += num;
        cout << fin << ". Show My Ticket" << endl;
        fin += num;
        cout << fin << ". Check Seat" << endl;
        fin += num;
        cout << fin << ". Add New Movie" << endl;
        fin += num;
        cout << fin << ". Edit Movie" << endl;
        fin += num;
        cout << fin << ". Delete Movie" << endl;
        fin += num;
        cout << fin << ". Show Movie List" << endl;
        fin += num;
        cout << fin << ". Exit" << endl;
        cout << "Choose One: ";
    }
    cin >> chooseOneFromMenu;

    switch (chooseOneFromMenu)
    {
    case 1:
        BookTicket();
        break;
    case 2:
        ShowMyTicket();
        break;
    case 3:
        CheckSeat();
        break;
    case 4:
        AddNewMovie();
        break;
    case 5:
        EditMovie();
        break;
    case 6:
        DeleteMovie();
        break;
    case 7:
        ShowMovieList();
        break;
    case 8:
        ExitProgram:
        cout << "Program terminating. Are you sure? (y/N): ";
        cin >> exitSurity;
        if (exitSurity == 'y' || exitSurity == 'Y') {
            return 0;
        }else if (exitSurity == 'n' || exitSurity == 'N') {
            system("cls");
            main();
        }else {
            cout << "Next time choose after read the corresponding line." << endl;
            goto ExitProgram;
        }
        break;
    default:
        cout << "Please choose between 1 - 7. Press Enter To Continue...";
        getch();
        system("cls");
        main();
        break;
    }
    return 0;
}

// Function Implementation
void BookTicket() {

    system("cls");

    // Variables
    char choose;
    string c_name = "";
    string c_phone = "";
    string c_seat = "";
    string getId = "";
    char chooseEditOrBuy;
    int itemIndex = 0;
    float totalPrice = 0.0;
    string totPrice = "";
    bool purchase, itemFalse = false, exitcode = false;

    string storeId[5000];
    string storeid = "";
    string storename = "";
    string storegenre = "";
    string storeformat = "";
    string storeshowDate = "";
    string storeshowTime = "";
    string storeticketPrice = "";
    string storeseat = "";
    int storeIndex = 0, storeIndexN = 0;
    // Variables End

    Welcome();
    qstate = mysql_query(conn, "select * from movie_tb");
    if (!qstate)
    {

        res = mysql_store_result(conn);

        printf("---------------------------------------------------------------------------------------------------\n");
        printf("| %-10s | %-15s | %-7s | %-15s | %-15s | %-10s | %-5s |\n", "Column Id", "Name", "Format", "Show Date", "Show Time", "Price", "Seat");
        while ((row = mysql_fetch_row(res)))
        {

            if (atoi(row[7]) > 0)
            {
                printf("| %-10s | %-15s | %-7s | %-15s | %-15s | %-10s | %-5s |\n", row[0], row[1], row[3], row[4], row[5], row[6], row[7]);
                storeId[storeIndex] = row[0];
                storeIndex++;
            }

        }
        printf("---------------------------------------------------------------------------------------------------\n");
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    itemFalse = true;
    for (;;) {
        cout << "Enter a Movie ID's (q to exit): ";
        cin >> getId;

        if (getId == "q") {
            exitcode = true;
            break;
        }

        for(int i = 0; i < storeIndex; i++)
        {
            if (getId == storeId[i])
            {
                itemFalse = false;
                break;
            }
        }
        if (itemFalse) {
            cout << "Enter a valid number." << endl;
            itemFalse = true;
        } else {
            break;
        }
    }

    if (!exitcode) {
        cout << "Enter Customer Name: "; cin >> c_name;
        cout << "Enter Customer Phone: "; cin >> c_phone;
        cout << "Book Seat: "; cin >> c_seat;

        string selectMovie = "select * from movie_tb where m_id = '"+getId+"'";
        const char* qn = selectMovie.c_str();
        qstate = mysql_query(conn, qn);

        if (!qstate)
        {

            res = mysql_store_result(conn);

            printf("--------------------------------------------------------------------\n");
            printf("| %-10s | %-15s | %-15s | %-15s |\n", "Column Id", "Name", "Format", "Price");
            while ((row = mysql_fetch_row(res)))
            {
                if (atoi(row[7]) > 0)
                {
                    printf("| %-10s | %-15s | %-15s | %-15s |\n", row[0], row[1], row[3], row[6]);
                    storeid = row[0];
                    storename = row[1];
                    storegenre = row[2];
                    storeformat = row[3];
                    storeshowDate = row[4];
                    storeshowTime = row[5];
                    storeticketPrice = row[6];
                    storeseat = row[7];
                }

            }
            printf("--------------------------------------------------------------------\n");
        }
        else
        {
            cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
        }

        string updatQuery = "update movie_tb set m_seat = m_seat - '"+c_seat+"' where m_id = '" +getId+ "'";
        const char* un = updatQuery.c_str();
        qstate = mysql_query(conn, un);

        totalPrice = strtof((storeticketPrice).c_str(), 0) * strtof((c_seat).c_str(), 0);
        stringstream tPrice;
        tPrice << totalPrice;
        tPrice >> totPrice;

        string insert_query = "insert into customer_tb (name, phone, movie, format, seat, price, showdate, showtime) values ('"+c_name+"','"+c_phone+"','"+storename+"', '"+storeformat+"', '"+c_seat+"', '"+totPrice+"', '"+storeshowDate+"', '"+storeshowTime+"')";
        const char* in = insert_query.c_str();
        qstate = mysql_query(conn, in);

        if(!qstate)
        {
            cout << endl << "Purchase Successfully Done." << endl;
            cout << endl << "Total Price: " << totalPrice << endl;
        }
    }

    // Exit Code
    cout << endl << "Press 'm' to Menu and any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else
    {
        exit(0);
    }




}

void ShowMyTicket() {

    system("cls");

    // Variables
    char choose;
    string input;
    // Variables End

    Welcome();
    cin.ignore(1, '\n');
    cout << "Enter Your Id Or Name: ";
    getline(cin, input);
    string findbyname_query = "select * from  customer_tb where id = '"+input+"' or name = '"+input+"'";
    const char* qn = findbyname_query.c_str();
    qstate = mysql_query(conn, qn);

    cout << endl;
    int c = 0;
    if (!qstate)
    {
        res = mysql_store_result(conn);
        while ((row = mysql_fetch_row(res)))
        {
            cout << "ID: " << row[0] << "\nName: " << row[1] << "\nPhone: " << row[2] << "\nMovie: " << row[3] << "\nFormat: " << row[4] << "\nSeat: " << row[5] << "\nPrice: " << row[6] << "\nShow Date: " << row[7] << "\nShow Time: " << row[8] << endl << endl;
            c++;
        }

        if (c == 0) {
            cout << "No ticket with this input" << endl;
        }
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    ExitMenu:
    cout << "Press 'm' to Menu, 'a' to Search again and any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else if (choose == 'a' || choose == 'A')
    {
        ShowMyTicket();
    }
    else
    {
        exit(0);
    }

}

void CheckSeat() {
    system("cls");

    // Variables
    char choose;
    string input;
    // Variables End

    Welcome();
    cin.ignore(1, '\n');
    qstate = mysql_query(conn, "select * from  movie_tb");

    if (!qstate)
    {
        res = mysql_store_result(conn);
        printf("-------------------------------------\n");
        printf("| %-15s | %-15s |\n", "Name", "Seat");
        while ((row = mysql_fetch_row(res)))
        {
            printf("| %-15s | %-15s |\n", row[1], row[7]);
        }
        printf("-------------------------------------\n");
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    ExitMenu:
    cout << "Press 'm' to Menu and any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else
    {
        exit(0);
    }
}

void AddNewMovie() {

    // Initial Load
    system("cls");
    // Initial Load End

    // Variables
    string name = "";
    string genre = "";
    string format = "";
    string showDate = "";
    string showTime = "";
    string ticketPrice = "";
    string seat = "";
    char choose;
    // Variables End

    Welcome();
    cin.ignore(1, '\n');
    cout << "Enter Name: ";
    getline(cin, name);
    cout << "Enter Genre: ";
    getline(cin, genre);
    cout << "Enter format: ";
    getline(cin, format);
    cout << "Enter Show Date (dd-mm-yyyy): ";
    getline(cin, showDate);
    cout << "Enter Show Time: ";
    getline(cin, showTime);
    cout << "Enter Ticket Price: ";
    getline(cin, ticketPrice);
    cout << "Enter Seat: ";
    getline(cin, seat);

    string insert_query = "insert into movie_tb (m_name, m_genre, m_format, m_showdate, m_showtime, m_ticketprice, m_seat) values ('"+name+"','"+genre+"','"+format+"',STR_TO_DATE('"+showDate+"', '%d-%m-%Y'),'"+showTime+"','"+ticketPrice+"', '"+seat+"')";

    const char* q = insert_query.c_str(); // c_str converts string to constant char and this is required

    qstate = mysql_query(conn, q);

    if (!qstate)
    {
        cout << endl << "Successfully added in database." << endl;
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    // Exit Code
    cout << "Press 'm' to Menu and 'a' to Insert Again Or Any Other key to exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else if (choose == 'a' || choose == 'A')
    {
        AddNewMovie();
    }
    else
    {
        exit(0);
    }
}

void EditMovie() {

    system("cls");

    // Variables
    string name = "";
    string genre = "";
    string format = "";
    string showDate = "";
    string showTime = "";
    string ticketPrice = "";
    string seat = "";
    string items[5000];
    char choose;
    int itemId;
    bool HaveException = false;
    bool NotInDatabase = false;
    int indexForId = 0;

    // Store Variables
    string storeid = "";
    string storename = "";
    string storegenre = "";
    string storeformat = "";
    string storeshowDate = "";
    string storeshowTime = "";
    string storeticketPrice = "";
    string storeseat = "";
    // Variables End

    Welcome();
    qstate = mysql_query(conn, "select m_id, m_name from movie_tb");
    if (!qstate)
    {
        res = mysql_store_result(conn);
        printf("--------------------------------\n");
        printf("| %-10s | %-15s |\n", "Column Id", "Name");
        while ((row = mysql_fetch_row(res)))
        {
            printf("| %-10s | %-15s |\n", row[0], row[1]);
            items[indexForId] = row[0];
            indexForId++;
        }
        printf("--------------------------------\n");
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    try
    {
        cout << endl;
        cout << "Enter Item ID: ";
        cin >> itemId;
        cout << endl;
    }
    catch (exception e)
    {
        cout << "Please Enter a valid NUMBER." << endl;
        HaveException = true;
        goto ExitMenu;
    }

    if (HaveException == false)
    {
        stringstream streamid;
        string strid;
        streamid << itemId;
        streamid >> strid;

        for (int i = 0; i < indexForId; i++)
        {
            if (strid != items[i])
            {
                NotInDatabase = true;
            }else
            {
                NotInDatabase = false;
                break;
            }
        }

        if (NotInDatabase == false)
        {
            string findbyid_query = "select * from movie_tb where m_id = '"+strid+"'";
            const char* qi = findbyid_query.c_str();
            qstate = mysql_query(conn, qi);

            if (!qstate)
            {
                res = mysql_store_result(conn);
                while (row = mysql_fetch_row(res))
                {
                    cout << "Column ID: " << row[0] << "\nName: "
                         << row[1] << "\nGenre: " << row[2] << "\nFormat: " << row[3] << "\nShow Date: " << row[4] << "\nShow Time: " << row[5] << "\nTicket Price: " << row[6] << "\nSeat: " << row[7] << endl << endl;

                    storeid = row[0];
                    storename = row[1];
                    storegenre = row[2];
                    storeformat = row[3];
                    storeshowDate = row[4];
                    storeshowTime = row[5];
                    storeticketPrice = row[6];
                    storeseat = row[7];
                }
            }
            else
            {
                cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
            }

            cin.ignore(1, '\n');
            string defaultString = "xN";
            cout << "Enter Name (" << defaultString << "  to not change): ";
            getline(cin, name);
            if (name == defaultString)
            {
                name = storename;
            }
            cout << "Enter Genre (" << defaultString << "  to not change): ";
            getline(cin, genre);
            if (genre == defaultString)
            {
                genre = storegenre;
            }
            cout << "Enter Format (" << defaultString << "  to not change): ";
            getline(cin, format);
            if (format == defaultString)
            {
                format = storeformat;
            }
            cout << "Enter Show Date (" << defaultString << "  to not change): ";
            getline(cin, showDate);
            if (showDate == defaultString)
            {
                showDate = storeshowDate;
            }
            cout << "Enter Show Time (" << defaultString << "  to not change): ";
            getline(cin, showTime);
            if (showTime == defaultString)
            {
                showTime = storeshowTime;
            }
            cout << "Enter Ticket Price (" << defaultString << "  to not change): ";
            cin >> ticketPrice;
            if (ticketPrice == defaultString)
            {
                 ticketPrice = storeticketPrice;
            }
            cout << "Enter Seat (" << defaultString << "  to not change): ";
            cin >> storeseat;
            if (seat == defaultString)
            {
                seat = storeseat;
            }

            string update_query = "update movie_tb set m_name = '"+name+"', m_genre = '"+genre+"', m_format = '"+format+"', m_showdate = '"+showDate+"', m_showtime = '"+showTime+"', m_ticketprice = '"+ticketPrice+"', m_seat = '"+seat+"' where m_id = '"+strid+"'";
            const char* qu = update_query.c_str();
            qstate = mysql_query(conn, qu);

            if (!qstate)
            {
                cout << endl << "Successfully Saved In Database." << endl;
            }
            else
            {
                cout << "Failed To Update!" << mysql_errno(conn) << endl;
            }

        }
        else
        {
            cout << "Item Not Found in database." << endl;
        }
    }

    ExitMenu:
    cout << "Press 'm' to Menu, 'e' to edit another item and any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else if (choose == 'e' || choose == 'E')
    {
        EditMovie();
    }
    else
    {
        exit(0);
    }
}

void DeleteMovie() {
    system("cls");

    // Variables
    char choose;
    int itemId;
    string items[5000];
    int indexForId = 0;
    bool HaveException = false, NotInDatabase = false;
    // Variables End

    Welcome();
    qstate = mysql_query(conn, "select * from movie_tb");
    if (!qstate)
    {
        res = mysql_store_result(conn);
        printf("--------------------------------------------------\n");
        printf("| %-10s | %-15s | %-15s |\n", "Column Id", "Name", "Price");
        printf("--------------------------------------------------\n");
        while ((row = mysql_fetch_row(res)))
        {
            printf("| %-10s | %-15s | %-15s |\n", row[0], row[1], row[6]);
            items[indexForId] = row[0];
            indexForId++;
        }
        printf("--------------------------------------------------\n");
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    try
    {
        cout << endl;
        cout << "Enter Item ID: ";
        cin >> itemId;
        cout << endl;
    }
    catch (exception e)
    {
        cout << "Please Enter a valid NUMBER." << endl;
        HaveException = true;
        goto ExitMenu;
    }

    if (HaveException == false)
    {
        stringstream streamid;
        string strid;
        streamid << itemId;
        streamid >> strid;

        for (int i = 0; i < indexForId; i++)
        {
            if (strid != items[i])
            {
                NotInDatabase = true;
            }else
            {
                NotInDatabase = false;
                break;
            }
        }

        if (NotInDatabase == false)
        {
            string delete_query = "delete from movie_tb where m_id = '"+strid+"'";
            const char* qd = delete_query.c_str();
            qstate = mysql_query(conn, qd);

            if (!qstate)
            {
                cout << "Successfully Deleted." << endl;
            }
            else
            {
                cout << "Failed To Delete!" << mysql_errno(conn) << endl;
            }

        }
        else
        {
            cout << "Item Not Found in database." << endl;
        }
    }

    // Exit Code
    ExitMenu:
    cout << "Press 'm' to Menu, 'd' to delete another item and any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else if (choose == 'd' || choose == 'D')
    {
        DeleteMovie();
    }
    else
    {
        exit(0);
    }
}

void ShowMovieList() {
    system("cls");

    // Variables
    char choose;
    string input;
    // Variables End

    Welcome();
    qstate = mysql_query(conn, "select * from movie_tb");
    if (!qstate)
    {
        res = mysql_store_result(conn);
        printf("-------------------------------------------------------------------------------------------------------------\n");
        printf("| %-15s | %-15s | %-15s | %-15s | %-15s | %-15s |\n", "Name", "Genre", "Format", "Show Date", "Show Time", "Price");
        printf("-------------------------------------------------------------------------------------------------------------\n");
        while ((row = mysql_fetch_row(res)))
        {
            printf("| %-15s | %-15s | %-15s | %-15s | %-15s | %-15s |\n", row[1], row[2], row[3], row[4], row[5], row[6], row[7]);
        }
        printf("-------------------------------------------------------------------------------------------------------------\n");
    }
    else
    {
        cout << "Query Execution Problem!" << mysql_errno(conn) << endl;
    }

    ExitMenu:
    cout << "Press 'm' to Menu any other key to Exit: ";
    cin >> choose;
    if (choose == 'm' || choose == 'M')
    {
        main();
    }
    else
    {
        exit(0);
    }
}


















