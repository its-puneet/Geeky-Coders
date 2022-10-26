package com.example.app1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import java.sql.*;

public class HomeActivity extends AppCompatActivity {
    EditText _txtUser;
    EditText _txtPass;
    Button _btnLOGIN;
    Spinner _spinner;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        Button b  = (Button)findViewById(R.id.b);
        _txtPass=(EditText)findViewById(R.id.txtPass);
        _txtUser=(EditText)findViewById(R.id.txtUser);
        String[] arraySpinner = new String[] {"User","Guard"};
        _spinner=(Spinner)findViewById(R.id.spinner);
        ArrayAdapter<String> adapter= new ArrayAdapter<String>(this,android.R.layout.simple_spinner_dropdown_item,arraySpinner);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        _spinner.setAdapter(adapter);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                String mobile = (_txtUser.getText().toString());
                String voter_id=_txtPass.getText().toString();
                String item=_spinner.getSelectedItem().toString();
                if (mobile.equals("9131798517") && voter_id.equals("TKC1234567") && item.equals("User")) {
                    Intent fintent = new Intent(getApplicationContext(), MainHomActivity.class);
                    startActivity(fintent);
                }
                else if (mobile.equals("8527684949") && voter_id.equals("SMC1234567") && item.equals("User")) {
                    Intent fintent = new Intent(getApplicationContext(), MainHomActivity.class);
                    startActivity(fintent);
                }
                else if (mobile.equals("9988776655") && voter_id.equals("GRD1234567") && item.equals("Guard")) {
                    Intent fintent = new Intent(getApplicationContext(), MainHomActivity.class);
                    startActivity(fintent);
                }
                else{
                    Intent hintent = new Intent(HomeActivity.this, HomeActivity.class);
                    startActivity(hintent);
                }



                    }
                }
            );
        }
    }

