Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy'
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :plants, only: [ :index, :show, :update, :create, :destroy ]
    end
  end

  root to: 'pages#home'
  get 'api' => 'pages#api_doc'

  resources :users, only: [:show] do
    resources :gardens, only: [ :index, :new, :create ]
  end
  resources :gardens, only: [:show, :edit, :update, :destroy] do
    resources :plant_position_by_gardens, only: [:create]
  end

  resources :zones, only: [:create]
  resources :cities, only: [:create ]

  resources :plants, only: [:index, :show, :new, :create] do
    resources :plant_info_by_zones, only: [ :index, :new, :create ]
    resources :collections, only: [:create]
  end
  resources :plant_info_by_zones, only: [ :show, :update, :edit ]
  resources :collections, only: [:edit, :update, :destroy]

end
