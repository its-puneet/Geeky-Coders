package com.example.app1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainHomActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_hom);
        Button f = findViewById(R.id.f);
        Button c = findViewById(R.id.c);
        Button sp = findViewById(R.id.sp);
        f.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent fmha = new Intent(getApplicationContext(), feedback.class);
                startActivity(fmha);
            }

        });
        c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent cmha = new Intent(getApplicationContext(), counter.class);
                startActivity(cmha);
            }

        });
        sp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent cmha = new Intent(getApplicationContext(), sprq.class);
                startActivity(cmha);
            }
        });
    }
}