import 'package:flutter/material.dart';
import 'package:to_do_app/all-const/colors.dart';
import 'package:to_do_app/model/itemToDo.dart';

class item extends StatelessWidget {
  final onItemChanged;
  final onItemDeletion;
  final itemToDo todo;
  final bool c_mode;
  const item(
      {Key? key,
      required this.c_mode,
      required this.todo,
      required this.onItemDeletion,
      required this.onItemChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(bottom: 20),
        child: ListTile(
          onTap: () => {onItemChanged(todo)},
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          tileColor: (c_mode) ? items_dark : tdGrey,
          leading: Icon(
            todo.isDone ? Icons.check_box : Icons.check_box_outline_blank,
            color: tdBlack,
          ),
          title: Text(todo.text!,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: tdBlack,
                decoration: todo.isDone ? TextDecoration.lineThrough : null,
              )),
          trailing: Container(
            height: 35,
            width: 35,
            decoration: BoxDecoration(
              color: tdRed,
              borderRadius: BorderRadius.circular(5),
            ),
            child: IconButton(
              color: tdBGColor,
              iconSize: 18,
              icon: Icon(Icons.delete),
              onPressed: () => {onItemDeletion(todo.ID)},
            ),
          ),
        ));
  }
}
