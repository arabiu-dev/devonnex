# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show update destroy]
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      rescue_from ActionController::ParameterMissing, with: :parameter_missing

      # GET /users
      def index
        @users = User.select(:id, :username, :full_name, :image_url).as_json(except: [:created_at, :updated_at])
    render json: @users
      end

      # GET /users/1
      def show
        render json: @user
      end

      def username_exist
        @user = User.find_by_username(params[:id])
        render json: @user
      end

      # POST /users
      def create
        @user = User.new(user_params)
        @user.id = params[:user][:id]
        @user.update(rating: 10, revenue: 100)

        if @user.save
          render json: @user, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /users/1
      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # DELETE /users/1
      def destroy
        @user.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:id, :full_name, :username, :expertise, :work_email, :phone_number, :bio, :revenue,
                                     :rating, :image_url)
      end

      def record_not_found
        render json: { error: 'Record not found' }
      end

      def parameter_missing
        render json: { error: 'Required parameter missing' }, status: :unprocessable_entity
      end
    end
  end
end
