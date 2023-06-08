# frozen_string_literal: true

class TalentSerializer < ActiveModel::Serializer
  attributes :id, :title, :ads_url, :rate, :user_id

  belongs_to :user
end
