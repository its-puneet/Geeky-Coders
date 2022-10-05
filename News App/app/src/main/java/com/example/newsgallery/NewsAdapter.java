package com.example.newsgallery;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import org.jetbrains.annotations.NotNull;
import java.util.ArrayList;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.ViewHolder> {

    /* List to store all the news Object */
    private final ArrayList<News> newsList = new ArrayList<>();
    private final NewsClickListener newsClickListener;

    /* constructor for the News Adapter */
    public NewsAdapter(NewsClickListener newsClickListener){
        this.newsClickListener = newsClickListener;
    }
    /* This function is called when the item is created */
    @NonNull
    @NotNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull @NotNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.new_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(view);
        view.setOnClickListener(v -> newsClickListener.onNewsItemClick(newsList.get(viewHolder.getAdapterPosition())));
        return viewHolder;
    }

    /* Binding the View holder to set the adapter to the layoutManager */
    @Override
    public void onBindViewHolder(@NonNull @NotNull NewsAdapter.ViewHolder holder, int position) {
        News currentNews = newsList.get(position);
        TextView title = holder.getTitleTextView();
        TextView author = holder.getAuthorTextView();
        ImageView newsImage = holder.getNewsImageView();
        title.setText(currentNews.getTitle());
        author.setText(currentNews.getAuthor());
        Glide.with(holder.itemView.getContext()).load(currentNews.getImageUrl()).into(newsImage);
    }

    /* Count of items in the ArrayList */
    @Override
    public int getItemCount() {
        return newsList.size();
    }

    public void updatedNews(ArrayList<News> updatedNews){
        newsList.clear();
        newsList.addAll(updatedNews);
        notifyDataSetChanged();
    }

    /* Custom View Holder class for the News Item */
    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final TextView author;
        private final TextView title;
        private final ImageView newsImage;

        public ViewHolder(@NonNull @NotNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.title);
            author = itemView.findViewById(R.id.author);
            newsImage = itemView.findViewById(R.id.newsImage);
        }

        public TextView getTitleTextView() {
            return title;
        }

        public TextView getAuthorTextView() {
            return author;
        }

        public ImageView getNewsImageView() {
            return newsImage;
        }
    }
}

interface NewsClickListener{
    void onNewsItemClick(News item);
}
