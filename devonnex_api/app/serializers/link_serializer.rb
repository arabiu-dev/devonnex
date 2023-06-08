# frozen_string_literal: true

class LinkSerializer < ActiveModel::Serializer
  attributes :id, :media_type, :url
  belongs_to :user
end
