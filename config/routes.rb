Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do

      resources :plants, only: [ :index, :show, :update, :create ]
    end
  end

  root to: 'pages#home'
  get 'api' => 'pages#api_instruction'

  resources :users, only: [:show] do
    resources :collections, only: [:create]
  end
  resources :collections, only: [:edit, :update, :destroy]
  resources :zones, only: [:create]
  resources :plants, only: [:index, :show, :new, :create] do
    resources :plant_info_by_zones, only: [ :index, :new, :create ]
  end
  resources :plant_info_by_zones, only: [ :show, :update, :edit ]

end
