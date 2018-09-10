FactoryBot.define do
  factory :user do
    factory :michael do
      name {'Michael Example'}
      email {'michael@spec.com'}
      password_digest {User.digest('password')}
      admin {true}
      activated {true}
      activated_at {Time.zone.now}
    end

    factory :archer do
      name {'Sterling Archer'}
      email {'duchess@spec.gov'}
      password_digest {User.digest('password')}
      activated {true}
      activated_at {Time.zone.now}
    end
  end
end
