# frozen_string_literal: true

require 'test_helper'

class TalentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @talent = talents(:one)
  end

  test 'should get index' do
    get talents_url, as: :json
    assert_response :success
  end

  test 'should create talent' do
    assert_difference('Talent.count') do
      post talents_url,
           params: { talent: { ads_url: @talent.ads_url, rate: @talent.rate, score: @talent.score, title: @talent.title, user_id: @talent.user_id } }, as: :json
    end

    assert_response :created
  end

  test 'should show talent' do
    get talent_url(@talent), as: :json
    assert_response :success
  end

  test 'should update talent' do
    patch talent_url(@talent),
          params: { talent: { ads_url: @talent.ads_url, rate: @talent.rate, score: @talent.score, title: @talent.title, user_id: @talent.user_id } }, as: :json
    assert_response :success
  end

  test 'should destroy talent' do
    assert_difference('Talent.count', -1) do
      delete talent_url(@talent), as: :json
    end

    assert_response :no_content
  end
end
