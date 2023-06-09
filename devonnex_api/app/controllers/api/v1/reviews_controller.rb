# frozen_string_literal: true

module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :set_review, only: %i[show update destroy]

      # GET /reviews
      def index
        @reviews = Review.all

        render json: @reviews
      end

      # GET /reviews/1
      def show
        render json: @review
      end

      # POST /reviews
      def create
        @review = Review.new(review_params)

        if @review.save
          render json: @review, status: :created
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /reviews/1
      def update
        if @review.update(review_params)
          render json: @review
        else
          render json: @review.errors, status: :unprocessable_entity
        end
      end

      # DELETE /reviews/1
      def destroy
        @review.destroy
      end

      def user_reviews
        username = params[:username]

        @reviews = Review.where('to_user = ?', username)

        render json: @reviews
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_review
        @review = Review.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def review_params
        params.require(:review).permit(:from_user, :to_user, :content, :gig_id, :user_id)
      end
    end
  end
end
