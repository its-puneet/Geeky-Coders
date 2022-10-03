package com.example.newsgallery;

import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;
import com.android.volley.Request;
import com.android.volley.toolbox.JsonObjectRequest;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class MainActivity extends AppCompatActivity implements NewsClickListener {

    NewsAdapter newsAdapter = new NewsAdapter(this);
    ProgressBar progressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.spinner);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        fetchData();

        recyclerView.setAdapter(newsAdapter);
    }

    public void fetchData(){

        /* Url from where the Data is to be extracted */
        String url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=5d963bf6eac04ab59d8dc1966cb30987";

        // Request a string response from the provided URL.
        JsonObjectRequest request = new JsonObjectRequest(
                Request.Method.GET, url, null,
                response -> {
                    try {
                        progressBar.setVisibility(View.GONE);
                        JSONArray articles = response.getJSONArray("articles");
                        ArrayList<News> newsList = new ArrayList<>();
                        for(int i = 0; i < articles.length();i++){
                            JSONObject articleObject = articles.getJSONObject(i);
                            String title = articleObject.getString("title");
                            String author = articleObject.getString("author");
                            String Url = articleObject.getString("url");
                            String imageUrl = articleObject.getString("urlToImage");
                            if(title.equals("null") || author.equals("null") || Url.equals("null") || imageUrl.equals("null")){
                                continue;
                            }
                            newsList.add(new News(title,author,Url,imageUrl));
                        }
                        newsAdapter.updatedNews(newsList);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> Toast.makeText(MainActivity.this,"Something went wrong",Toast.LENGTH_SHORT).show()){
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<>();
                headers.put("User-Agent", "Mozilla/5.0");
                return headers;
            }
        };
        MySingleton.getInstance(this).addToRequestQueue(request);
    }

    @Override
    public void onNewsItemClick(News item) {
        /*Toast.makeText(this, item.getAuthor(), Toast.LENGTH_SHORT).show();*/
        String url = item.getUrl();
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
        CustomTabsIntent customTabsIntent = builder.build();
        customTabsIntent.launchUrl(this, Uri.parse(url));
    }
}
