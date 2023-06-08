# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_comment, only: %i[show update destroy]

      # GET /comments
      def index
        @comments = Comment.all

        render json: @comments, include: ['user']
      end

      # GET /comments/1
      def show
        render json: @comment, include: ['user']
      end

      # POST /comments
      def create
        @comment = Comment.new(comment_params)

        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /comments/1
      def update
        if @comment.update(comment_params)
          render json: @comment
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      # DELETE /comments/1
      def destroy
        @comment.destroy
      end

      def user_comments
        user_id = params[:user_id]

        @comments = Comment.where('user_id = ?', user_id)

        render json: @comments
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @comment = Comment.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def comment_params
        puts params
        params.require(:comment).permit(:user_id, :content, :post_id)
      end
    end
  end
end
