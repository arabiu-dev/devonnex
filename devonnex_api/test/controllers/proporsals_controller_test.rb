# frozen_string_literal: true

require 'test_helper'

class ProposalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @proposal = proporsals(:one)
  end

  test 'should get index' do
    get proporsals_url, as: :json
    assert_response :success
  end

  test 'should create proposal' do
    assert_difference('proposal.count') do
      post proporsals_url, params: { proposal: { gig_id: @proposal.gig_id } }, as: :json
    end

    assert_response :created
  end

  test 'should show proposal' do
    get proporsal_url(@proposal), as: :json
    assert_response :success
  end

  test 'should update proposal' do
    patch proporsal_url(@proposal), params: { proposal: { gig_id: @proposal.gig_id } }, as: :json
    assert_response :success
  end

  test 'should destroy proposal' do
    assert_difference('proposal.count', -1) do
      delete proporsal_url(@proposal), as: :json
    end

    assert_response :no_content
  end
end
