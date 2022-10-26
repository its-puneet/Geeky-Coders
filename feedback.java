package com.example.app1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;

public class feedback extends AppCompatActivity {

    int s = 2000;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

         new Handler().postDelayed(new Runnable() {
        @Override public void run() {
        Intent fin = new Intent(getApplicationContext(), fsplash.class);
        startActivity(fin);
        finish();
        }
        },s);
         Intent nfin = new Intent(getApplicationContext(),MainHomActivity.class);
         startActivity(nfin);
    }
}

