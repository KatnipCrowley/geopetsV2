// ============================================
// ARCHIVO CENTRALIZADO DE DATOS MOCKUP
// ============================================

// ============================================
// TIPOS E INTERFACES
// ============================================

export type LocationCategory = "restaurant" | "park" | "landmark" | "other";

export interface Location {
    id: string;
    name: string;
    description: string;
    category: LocationCategory;
    latitude: number;
    longitude: number;
}

export interface NotificacionData {
    id: string;
    name: string;
    date: string;
    text: string;
    type: "follower" | "alert" | "comment" | "chat";
    avatar?: string;
    readed?: boolean;
    commentText?: string;
    imageUrl?: string;
}

export interface PostData {
    id?: number;
    author: string;
    action: string;
    date: string;
    likes: number;
    comments: number;
    location?: [number, number];
    content: string;
}

export interface UserData {
    username: string;
    handle: string;
    avatar: string;
    coverImage: string;
    bio: string;
    location: string;
    joinDate: string;
    stats: {
        followers: number;
        following: number;
    };
}

export interface PetData {
    id: string;
    name: string;
    type: string;
    age: string;
    gender: string;
    breed: string;
}

// ============================================
// DATOS MOCKUP - UBICACIONES
// ============================================

export const mockLocations: Location[] = [
    {
        id: "1",
        name: "Restaurante El Buen Sabor",
        description: "Comida mexicana tradicional",
        category: "restaurant",
        latitude: 19.4326,
        longitude: -99.1332
    },
    {
        id: "2",
        name: "Parque Chapultepec",
        description: "Gran parque urbano con lagos y museos",
        category: "park",
        latitude: 19.4195,
        longitude: -99.1820
    },
    {
        id: "3",
        name: "Ángel de la Independencia",
        description: "Monumento histórico icónico",
        category: "landmark",
        latitude: 19.4270,
        longitude: -99.1677
    },
    {
        id: "4",
        name: "Café La Estrella",
        description: "Cafetería con ambiente acogedor",
        category: "other",
        latitude: 19.4350,
        longitude: -99.1400
    }
];

// ============================================
// DATOS MOCKUP - NOTIFICACIONES
// ============================================

export const mockNotificaciones: NotificacionData[] = [
    {
        id: "1",
        type: "follower",
        name: "Carlos Mendez",
        date: "Hace 1 hora",
        text: "Comenzó a seguirte",
        readed: false
    },
    {
        id: "2",
        type: "chat",
        name: "Sistema",
        date: "Hace 3 horas",
        text: "Alguien ha visto tu mascota",
        readed: false
    },
    {
        id: "3",
        type: "comment",
        name: "Ana García",
        date: "Hace 1 día",
        text: "Hizo un comentario",
        commentText: "¡Qué linda mascota! Me encanta 🐶",
        imageUrl: "https://picsum.photos/60/60?random=1",
        readed: true
    },
];

// ============================================
// DATOS MOCKUP - POSTS (FEED)
// ============================================

export const mockPostsFeed: PostData[] = [
    {
        author: "María González",
        action: "compartió una ubicación",
        date: "hace 2 horas",
        likes: 45,
        comments: 12,
        location: [40.4168, -3.7038],
        content: "¡Encontré este lugar increíble en el centro de Madrid! Totalmente recomendado para comer."
    },
    {
        author: "Carlos Ruiz",
        action: "marcó un punto de interés",
        date: "hace 5 horas",
        likes: 78,
        comments: 23,
        location: [41.3851, 2.1734],
        content: "La vista desde aquí es espectacular. Si vienen a Barcelona, no se lo pierdan."
    },
    {
        author: "Ana Martínez",
        action: "publicó",
        date: "hace 1 día",
        likes: 156,
        comments: 45,
        content: "¿Alguien conoce buenos lugares para hacer senderismo cerca de Valencia? Busco rutas de nivel intermedio."
    },
    {
        author: "Juan Pérez",
        action: "compartió una experiencia",
        date: "hace 2 días",
        likes: 89,
        comments: 31,
        content: "Acabo de terminar mi ruta de 20km. ¡Qué satisfacción! El entrenamiento para la maratón va viento en popa 🏃‍♂️"
    },
    {
        author: "Laura Sánchez",
        action: "preguntó",
        date: "hace 3 días",
        likes: 34,
        comments: 18,
        content: "¿Cuál es su aplicación favorita para planificar rutas de ciclismo? Necesito recomendaciones urgentes."
    }
];

// ============================================
// DATOS MOCKUP - USUARIO PERFIL
// ============================================

export const mockUser: UserData = {
    username: "Alex Aventurero",
    handle: "alexaventurero",
    avatar: "https://picsum.dev/128?seed=3",
    coverImage: "https://picsum.dev/800/300?seed=cover",
    bio: "Tengo una mascota",
    location: "Santiago, Chile",
    joinDate: "Marzo 2024",
    stats: {
        followers: 52,
        following: 186
    }
};

// ============================================
// DATOS MOCKUP - MASCOTAS
// ============================================

export const mockPets: PetData[] = [
    {
        id: "1",
        name: "Cachipun",
        type: "Perro",
        age: "4 meses",
        gender: "Masculino",
        breed: "Pastor Aleman",
    },
    {
        id: "2",
        name: "Bizcocho",
        type: "Gato",
        age: "4 meses",
        gender: "Masculino",
        breed: "Pastor Aleman",
    },
]

// ============================================
// FUNCIONES HELPER
// ============================================

export const getCategoryName = (category: LocationCategory): string => {
    const categories: Record<LocationCategory, string> = {
        "restaurant": "Restaurante",
        "park": "Parque",
        "landmark": "Punto de interés",
        "other": "Otro"
    };
    return categories[category];
};

export const getCategoryClass = (category: LocationCategory): string => {
    return `category-${category}`;
};
