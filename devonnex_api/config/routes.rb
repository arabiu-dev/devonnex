# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/users/:id/exist', to: 'users#username_exist', as: 'username_exist'
      get 'user/gigs', to: 'gigs#user_gigs', as: 'user_gigs'
      get 'user/reviews', to: 'reviews#user_reviews', as: 'user_reviews'
      get 'user/comments', to: 'comments#user_comments', as: 'user_comments'
      get 'user/posts', to: 'posts#user_posts', as: 'user_posts'
      get 'posts/popular', to: 'posts#popular_posts', as: 'popular_posts'
      put '/sections', to: 'sections#batch_update', as: 'batch_update_sections'
      put '/proposal_sections', to: 'proposal_sections#batch_update', as: 'batch_update_proposal_sectionss'
      put '/paragraphs', to: 'paragraphs#batch_update', as: 'batch_update_paragraphs'
      resources :users
      resources :posts
      resources :gigs
      resources :talents
      resources :paragraphs
      resources :sections
      resources :comments
      resources :proposals
      resources :proposal_sections
      resources :reviews
    end
  end
end
