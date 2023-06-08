# frozen_string_literal: true

require 'test_helper'

class ProposalBulletsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @proporsal_bullet = proporsal_bullets(:one)
  end

  test 'should get index' do
    get proporsal_bullets_url, as: :json
    assert_response :success
  end

  test 'should create proporsal_bullet' do
    assert_difference('ProposalBullet.count') do
      post proporsal_bullets_url,
           params: { proporsal_bullet: { bullet: @proporsal_bullet.bullet, order: @proporsal_bullet.order, proporsal_section_id: @proporsal_bullet.proporsal_section_id } }, as: :json
    end

    assert_response :created
  end

  test 'should show proporsal_bullet' do
    get proporsal_bullet_url(@proporsal_bullet), as: :json
    assert_response :success
  end

  test 'should update proporsal_bullet' do
    patch proporsal_bullet_url(@proporsal_bullet),
          params: { proporsal_bullet: { bullet: @proporsal_bullet.bullet, order: @proporsal_bullet.order, proporsal_section_id: @proporsal_bullet.proporsal_section_id } }, as: :json
    assert_response :success
  end

  test 'should destroy proporsal_bullet' do
    assert_difference('ProposalBullet.count', -1) do
      delete proporsal_bullet_url(@proporsal_bullet), as: :json
    end

    assert_response :no_content
  end
end
