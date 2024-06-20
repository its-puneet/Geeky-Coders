#include <bits/stdc++.h>
#include "assert.h"
#include "mylinkedlist.h"
#include "myqueue.h"
#include <bits/stdc++.h>
#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
using namespace std;
#define ln "\n"
#define ll long long
#define fast_cin()                    \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL);

// user inputs
ll sizeofRow, sizeofColumn;
ll input[6][6];

// input matrix in form of string
char *initialState;
myQueue *endNode;

// Direction to move to block
ll X[4] = {0, 0, 1, -1};
ll Y[4] = {1, -1, 0, 0};

void takeInput()
{
    cout << "\nEnter the desired number of rows: ";
    cin >> sizeofRow;
    cout << "\nEnter the desired number of columns: ";
    cin >> sizeofColumn;
    ll product = (sizeofRow * sizeofColumn * 1LL);
    if (product > 9)
    {
        cout << "\nGrid size is too big to handle\n"
             << ln;
        exit(0); // To end the program
    }

    // array to check if any number is visited greater than once

    ll no_of_Occurence[product];

    // we intialised with 0 value
    memset(no_of_Occurence, 0, sizeof(no_of_Occurence));

    cout << "\nEnter the initial grid with" << sizeofRow << "sizeofRow and" << sizeofColumn << "sizeofColumn\n";
    cout << "Only distinct numbers between 1-" << product - 1 << " and a 0 to represent an empty space\n\n";

    for (ll i = 0; i < sizeofRow; i++)
    {
        for (ll j = 0; j < sizeofColumn; j++)
        {
            cin >> input[i][j];

            // if any invalid value is added to grid
            if (input[i][j] >= product)
            {
                cout << "\n Sorry, Enter number is invalid \n"
                     << ln;
                exit(0);
            }

            // we increase the number of occurence
            no_of_Occurence[input[i][j]]++;
        }
    }

    // if any character is repeated in the grid
    for (ll i = 0; i < product; i++)
    {
        if (no_of_Occurence[i] != 1)
        {
            cout << "\nYou have entered INVALID grid \n";
            exit(0);
        }
    }
}

//-------------------------Converts a matrix to string format------------------------
void convertMatrixToString()
{
    initialState = (char *)malloc(sizeof(char) * (sizeofRow * sizeofColumn + 1));
    ll index = 0;
    for (ll i = 0; i < sizeofRow; i++)
    {
        for (ll j = 0; j < sizeofColumn; j++)
        {
            initialState[index++] = (char)(input[i][j] + '0');
        }
    }
    initialState[index] = '\0';
}

//----------------------prints a matrix of sizeofRow rows and sizeofColumn columns from a string------------------
void printMatrixFromString(char *string)
{
    cout<<"\n";
    for (ll i = 0; string[i] != '\0'; i++)
    {
        cout<< string[i];
        if (((i + 1) % sizeofColumn) == 0)
        {
            cout<<"\n";
            for (ll j = 0; j < sizeofColumn; j++)
                cout<<"---";
            cout<<"\n";
        }
        else
        {
            cout<<" | ";
        }
    }
    cout<<"\n";
}

//------------------------Returns 1 if solution state is reached, else 0-----------------------------------
ll reachedAnswerState(char *toCheck)
{
    for (ll i = 0; i + 1 < sizeofRow * sizeofColumn; i++)
    {
        if ((toCheck[i] - '0') != (i + 1))
            return 0;
    }

    return toCheck[sizeofRow * sizeofColumn - 1] == '0';
}

void swap(char *a, char *b)
{
    char temp = *a;
    *a = *b;
    *b = temp;
}

//---------------------pushes all the reachable states from a given state----------------------------------
//-----------------------------------Time Complexity : O((N*M)!)---------------------------------------------
void pushReachableStates(myQueue *parent, char *initialState)
{
    // Finding the index at which empty space or 0 is present
    ll indexOfZero = -1;
    for (ll i = 0; i < sizeofRow * sizeofColumn; i++)
    {
        if (initialState[i] == '0')
        {
            indexOfZero = i;
            break;
        }
    }

    // Computing the x and y coordinate of 0 in grid
    ll xCoordinate = indexOfZero / sizeofColumn;
    ll yCoordinate = indexOfZero % sizeofColumn;

    // moving in all four directions
    for (ll i = 0; i < 4; i++)
    {
        ll newX = xCoordinate + X[i];
        ll newY = yCoordinate + Y[i];

        // if new cell is inside the matrix
        if (newX >= 0 && newX < sizeofRow && newY >= 0 && newY < sizeofColumn)
        {
            // moving the empty space
            swap(&initialState[newX * sizeofColumn + newY], &initialState[indexOfZero]);

            // checking if we have reached this state initially or not
            if (isPresent(initialState) == 0)
            {
                insert(initialState);
                enqueue(initialState, initialState[indexOfZero] - '0', parent);
            }

            // moving the empty space back to it's original position
            swap(&initialState[newX * sizeofColumn + newY], &initialState[indexOfZero]);
        }
    }
}

//---------------------Returns the number of minimum moves to solve the input grid---------------------------
//-----------------------------------Time Complexity : O((N*M)!)---------------------------------------------
ll minimumMoves()
{
    // initializing queue and adding the initialState
    initializeQueue();

    enqueue(initialState, -1, NULL);
    insert(initialState);

    // denotes moves until we find solution state
    ll movesTillNow = 0;

    // while there are more states to explore
    while (is_empty() == false)
    {
        ll size = queueSize();

        // exploring all the states within one move
        while (size--)
        {
            char *currentState = (char *)malloc(sizeof(char) * 10);
            myQueue *currentNode = frontNode();
            strcpy(currentState, frontVal());

            dequeue();

            if (reachedAnswerState(currentState))
            {
                endNode = currentNode;
                return movesTillNow;
            }

            pushReachableStates(currentNode, currentState);
        }

        // incrementing number of moves to reach the solution state
        movesTillNow++;
    }

    // there is no solution for the input grid
    return -1;
}

int main()
{
    takeInput();
    convertMatrixToString();

    ll result = minimumMoves();

    // if there is no possible solution
    if (result == -1)
    {
        cout << "\nNot Possible";
    }
    else
    {
        // shortest number of moves
        cout << "\nShortest number of moves = " << result << ln;

        // reversing the path of parents to print from front
        myQueue *startNode = reversePath(endNode);

        // until the end of the path
        while (startNode != NULL)
        {
            printMatrixFromString(startNode->val);
            ll toMove = startNode->valMoved;
            startNode = startNode->parent;

            if (startNode)
            {
                cout << "Press any key to continue\n";

                cout << "\nMoving " << startNode->valMoved << " to reach next state:\n";
            }
        }
    }
    return  0;
}