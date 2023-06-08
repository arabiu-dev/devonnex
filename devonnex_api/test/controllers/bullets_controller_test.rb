# frozen_string_literal: true

require 'test_helper'

class BulletsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bullet = bullets(:one)
  end

  test 'should get index' do
    get bullets_url, as: :json
    assert_response :success
  end

  test 'should create bullet' do
    assert_difference('Bullet.count') do
      post bullets_url, params: { bullet: { bullet: @bullet.bullet, setion_id: @bullet.setion_id } }, as: :json
    end

    assert_response :created
  end

  test 'should show bullet' do
    get bullet_url(@bullet), as: :json
    assert_response :success
  end

  test 'should update bullet' do
    patch bullet_url(@bullet), params: { bullet: { bullet: @bullet.bullet, setion_id: @bullet.setion_id } }, as: :json
    assert_response :success
  end

  test 'should destroy bullet' do
    assert_difference('Bullet.count', -1) do
      delete bullet_url(@bullet), as: :json
    end

    assert_response :no_content
  end
end
