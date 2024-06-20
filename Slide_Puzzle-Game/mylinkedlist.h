
//** singly Lindked list operation  operation  *//

#include <bits/stdc++.h>

//node of singly linked list
struct listNode
{
    struct listNode *next; //next node linked to current node
    char *data;            //string state contained by the list
};

struct listNode *head = NULL;

//Returns 1 if value is found in the list, else 0
//Time complexity : O(N)
int isPresent(char *value)
{
    struct listNode *dummy = head;
    while (dummy)
    {
        //if data of dummy node and value is same
        if (strcmp(value, dummy->data) == 0)
            return 1;

        dummy = dummy->next;
    }
    return 0;
}

//Inserts a new value in the list
//Time complexity : O(1)
void insert(char *value)
{
    struct listNode *newNode = (struct listNode *)malloc(sizeof(struct listNode));

    newNode->data = (char *)malloc(sizeof(char) * 10);
    strcpy(newNode->data, value);
    newNode->next = head;

    head = newNode;
}
