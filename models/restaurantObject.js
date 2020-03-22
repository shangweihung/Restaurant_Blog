const restaurantObject = {
    name: {
        name: 'name', title: '餐廳名稱', required: true,
        tag: '*', htmlInputType: 'text', 
        hint: '必填欄位', fontAwesome: ''
    },
    name_en: {
        name: 'name_en', title: '餐廳英文名稱', required: false,
        tag: '', htmlInputType: 'text', 
        hint: '', fontAwesome: 'fas fa-language  mr-2'
    },
    category: {
        name: 'category', title: '類別', required: true,
        tag: '*', htmlInputType: 'radio', 
        hint: '必填欄位', fontAwesome: 'fas fa-utensils pr-2 mr-2'
    },
    image: {
        name: 'image', title: '圖片網址', required: false,
        tag: '', htmlInputType: 'text',
        hint: '', fontAwesome: 'fas fa-camera-retro mr-2'
    },
    location: {
        name: 'location', title: '地址', required: true,
        tag: '*', htmlInputType: 'text',
        hint: '必填欄位', fontAwesome: 'fas fa-map-marker-alt pr-2 mr-2'
    },
    phone: {
        name: 'phone', title: '電話', required: true,
        tag: '*', htmlInputType: 'text',
        hint: '必填欄位', fontAwesome: 'fas fa-mobile-alt pr-2 mr-2'
    },
    google_map: {
        name: 'google_map', title: 'Google Map', required: false,
        tag: '', htmlInputType: 'text',
        hint: '', fontAwesome: 'fas fa-map-marker-alt pr-2 mr-2'
    },
    rating: {
        name: 'rating', title: '評價', required: true,
        tag: '*', htmlInputType: 'text',
        hint: '必填欄位', fontAwesome: 'fas fa-star fa-xs mr-2'
    },
    description: {
        name: 'description', title: '餐廳描述', required: false,
        tag: '*', htmlInputType: 'text',
        hint: '必填欄位', fontAwesome: 'fas fa-pencil-alt mr-2'
    },
}

module.exports = restaurantObject