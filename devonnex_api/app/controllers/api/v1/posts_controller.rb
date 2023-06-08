# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[show update destroy]

      def index
        @posts = Post.order(created_at: :desc)

        # Apply filters if provided
        @posts = apply_filters(@posts, params[:filter]) if params[:filter]

        # Apply pagination
        @posts = @posts.page(params[:page]).per(5)

        render json: {
          posts: ActiveModelSerializers::SerializableResource.new(@posts, each_serializer: PostSerializer),
          total_count: @posts.total_count,
          current_page: @posts.current_page,
          per_page: @posts.limit_value,
          total_pages: @posts.total_pages
        }
      end

      # GET /posts/1
      def show
        render json: @post, each_serializer: PostSerializer,
               include: ['comments', 'user', 'paragraphs', 'comments.user']
      end

      # POST /posts
      def create
        @post = Post.new(post_params)

        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1
      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # DELETE /posts/1
      def destroy
        @post.destroy
      end

      def user_posts
        user_id = params[:user_id]

        @posts = Post.where('user_id = ?', user_id).limit(5).order(created_at: :desc)

        render json: @posts
      end

      def popular_posts
        @posts = Post.joins(:comments)
            .select('posts.*, COUNT(comments.id) AS comment_count')
            .group('posts.id')
            .order('comment_count DESC')
            .limit(5)


        render json: @posts
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:id, :user_id, :title, :topic, :readtime, :image_url, tags: [])
      end

      def apply_filters(posts, filter)
        posts = posts.where('topic LIKE ?', "%#{filter}%") if filter != 'All'
        posts
      end
    end
  end
end
