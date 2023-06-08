# frozen_string_literal: true

class SectionSerializer < ActiveModel::Serializer
  attributes :id, :header, :description, :bullets

  belongs_to :gig
end
