# frozen_string_literal: true

class SkillSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :user
end
