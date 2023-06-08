# frozen_string_literal: true

module Api
  module V1
    class BulletsController < ApplicationController
      before_action :set_bullet, only: %i[show update destroy]

      # GET /bullets
      def index
        @bullets = Bullet.all

        render json: @bullets
      end

      # GET /bullets/1
      def show
        render json: @bullet
      end

      # POST /bullets
      def create
        @bullet = Bullet.new(bullet_params)

        if @bullet.save
          render json: @bullet, status: :created, location: @bullet
        else
          render json: @bullet.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /bullets/1
      def update
        if @bullet.update(bullet_params)
          render json: @bullet
        else
          render json: @bullet.errors, status: :unprocessable_entity
        end
      end

      # DELETE /bullets/1
      def destroy
        @bullet.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_bullet
        @bullet = Bullet.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def bullet_params
        params.require(:bullet).permit(:bullet, :setion_id)
      end
    end
  end
end
