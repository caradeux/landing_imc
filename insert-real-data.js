import { db } from './src/lib/database.js';

async function insertRealData() {
  try {
    console.log('🚀 Starting real data insertion...');
    
    // Clear existing data first
    console.log('🗑️ Clearing existing data...');
    await db.query('DELETE FROM projects;');
    await db.query('DELETE FROM testimonials;');
    await db.query('DELETE FROM clients;');
    await db.query('DELETE FROM site_stats;');
    await db.query('DELETE FROM certifications;');
    await db.query('DELETE FROM site_images;');
    console.log('✅ Existing data cleared');
    
    // Insert projects data
    console.log('📊 Inserting projects data...');
    const projectsData = [
      {
        title: 'Remodelación Jumbo Maipú',
        description: 'Remodelación integral de supermercado Jumbo incluyendo sistemas eléctricos, obras civiles y acabados premium.',
        category: 'Retail',
        year: '2024',
        area: '2,500 m²',
        duration: '3 meses',
        location: 'Maipú, Santiago',
        image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        services: JSON.stringify(['Servicios Eléctricos', 'Obras Civiles', 'Acabados Premium']),
        highlights: JSON.stringify(['Instalación de sistema LED completo', 'Renovación de pisos industriales', 'Modernización de sistemas eléctricos', 'Acabados de alta calidad']),
        display_order: 1
      },
      {
        title: 'Construcción Bodega Construmart',
        description: 'Construcción de bodega industrial con estructuras de alta resistencia y sistemas especializados.',
        category: 'Industrial',
        year: '2023',
        area: '5,000 m²',
        duration: '6 meses',
        location: 'Quilicura, Santiago',
        image_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        services: JSON.stringify(['Obras Civiles', 'Estructuras Metálicas', 'Techumbres']),
        highlights: JSON.stringify(['Fundaciones de alta resistencia', 'Estructuras metálicas certificadas', 'Sistema de techumbre industrial', 'Instalaciones eléctricas industriales']),
        display_order: 2
      },
      {
        title: 'Modernización Easy Providencia',
        description: 'Modernización completa de tienda Easy con nuevos estándares de diseño y funcionalidad.',
        category: 'Retail',
        year: '2024',
        area: '3,200 m²',
        duration: '4 meses',
        location: 'Providencia, Santiago',
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        services: JSON.stringify(['Carpintería Especializada', 'Servicios Eléctricos', 'Acabados']),
        highlights: JSON.stringify(['Mobiliario comercial personalizado', 'Sistemas de iluminación LED', 'Carpintería en metalcom', 'Acabados arquitectónicos']),
        display_order: 3
      },
      {
        title: 'Oficinas Corporativas',
        description: 'Oficinas corporativas modernas con diseño arquitectónico de vanguardia.',
        category: 'Corporativo',
        year: '2024',
        area: '1,800 m²',
        duration: '5 meses',
        location: 'Las Condes, Santiago',
        image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        services: JSON.stringify(['Carpintería', 'Acabados Premium', 'Servicios Eléctricos']),
        highlights: JSON.stringify(['Diseño arquitectónico moderno', 'Acabados de lujo', 'Sistemas inteligentes', 'Espacios colaborativos']),
        display_order: 4
      }
    ];
    
    for (const project of projectsData) {
      const result = await db.query(
        `INSERT INTO projects (title, description, category, year, area, duration, location, image_url, services, highlights, display_order, active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, now(), now()) RETURNING id`,
        [project.title, project.description, project.category, project.year, project.area, project.duration, project.location, project.image_url, project.services, project.highlights, project.display_order]
      );
      console.log(`✅ Inserted project: ${project.title} (ID: ${result.rows[0].id})`);
    }
    
    // Insert testimonials data
    console.log('📊 Inserting testimonials data...');
    const testimonialsData = [
      {
        client_name: 'Juan Pérez',
        client_company: 'Jumbo Supermercados',
        client_position: 'Gerente de Operaciones',
        client_photo_url: '',
        testimonial_text: 'Excelente trabajo en la remodelación de nuestra tienda. El equipo fue muy profesional y cumplió con todos los plazos establecidos. La calidad del trabajo superó nuestras expectativas.',
        rating: 5,
        project_name: 'Remodelación Jumbo Maipú',
        display_order: 1
      },
      {
        client_name: 'María González',
        client_company: 'Construmart',
        client_position: 'Jefa de Proyectos',
        client_photo_url: '',
        testimonial_text: 'La construcción de nuestra nueva bodega fue impecable. Destacamos la atención al detalle y el compromiso con la seguridad en cada etapa del proyecto.',
        rating: 5,
        project_name: 'Construcción Bodega Construmart',
        display_order: 2
      },
      {
        client_name: 'Carlos Rodríguez',
        client_company: 'Easy',
        client_position: 'Director de Mantención',
        client_photo_url: '',
        testimonial_text: 'Muy satisfechos con la modernización de nuestras instalaciones. El equipo demostró gran expertise técnico y excelente capacidad de coordinación.',
        rating: 5,
        project_name: 'Modernización Easy Providencia',
        display_order: 3
      }
    ];
    
    for (const testimonial of testimonialsData) {
      const result = await db.query(
        `INSERT INTO testimonials (client_name, client_company, client_position, client_photo_url, testimonial_text, rating, project_name, display_order, active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, now(), now()) RETURNING id`,
        [testimonial.client_name, testimonial.client_company, testimonial.client_position, testimonial.client_photo_url, testimonial.testimonial_text, testimonial.rating, testimonial.project_name, testimonial.display_order]
      );
      console.log(`✅ Inserted testimonial: ${testimonial.client_name} (ID: ${result.rows[0].id})`);
    }
    
    console.log('🎉 Real data insertion completed successfully!');
    
    // Verify the data
    const projectCount = await db.query('SELECT COUNT(*) FROM projects');
    const testimonialCount = await db.query('SELECT COUNT(*) FROM testimonials');
    
    console.log(`📊 Verification:`);
    console.log(`   Projects: ${projectCount.rows[0].count}`);
    console.log(`   Testimonials: ${testimonialCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error inserting real data:', error);
    throw error;
  }
}

// Run the insertion
insertRealData()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });