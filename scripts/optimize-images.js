import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações de otimização
const OPTIMIZATION_CONFIG = {
  jpeg: { quality: 85, progressive: true },
  png: { quality: 85, compressionLevel: 9 },
  webp: { quality: 85, effort: 6 },
  avif: { quality: 85, effort: 9 }
};

// Diretórios para procurar imagens
const IMAGE_DIRECTORIES = [
  path.join(__dirname, '../public'),
  path.join(__dirname, '../src/assets'),
];

// Extensões de imagem suportadas
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

async function findImages(directory) {
  const images = [];
  
  try {
    const items = await fs.readdir(directory, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(directory, item.name);
      
      if (item.isDirectory()) {
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (SUPPORTED_EXTENSIONS.includes(path.extname(item.name).toLowerCase())) {
        images.push(fullPath);
      }
    }
  } catch (error) {
    console.log(`Diretório não encontrado: ${directory}`);
  }
  
  return images;
}

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  const dirname = path.dirname(imagePath);
  
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    console.log(`Otimizando: ${path.relative(process.cwd(), imagePath)}`);
    console.log(`  Tamanho original: ${metadata.width}x${metadata.height}`);
    
    // Otimizar imagem original
    let optimized = image;
    
    // Redimensionar se muito grande (mantendo aspect ratio)
    if (metadata.width > 1920 || metadata.height > 1080) {
      optimized = optimized.resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Aplicar otimizações específicas por formato
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        await optimized
          .jpeg(OPTIMIZATION_CONFIG.jpeg)
          .toFile(path.join(dirname, `${basename}_optimized${ext}`));
        break;
      case '.png':
        await optimized
          .png(OPTIMIZATION_CONFIG.png)
          .toFile(path.join(dirname, `${basename}_optimized${ext}`));
        break;
    }
    
    // Gerar versão WebP
    await optimized
      .webp(OPTIMIZATION_CONFIG.webp)
      .toFile(path.join(dirname, `${basename}.webp`));
    
    // Gerar versão AVIF para máxima compressão
    try {
      await optimized
        .avif(OPTIMIZATION_CONFIG.avif)
        .toFile(path.join(dirname, `${basename}.avif`));
    } catch (error) {
      console.log(`  AVIF não suportado para: ${basename}`);
    }
    
    // Gerar versões responsivas
    const responsiveSizes = [480, 768, 1024, 1280];
    
    for (const size of responsiveSizes) {
      if (metadata.width > size) {
        // WebP responsivo
        await image
          .resize(size, null, { withoutEnlargement: true })
          .webp(OPTIMIZATION_CONFIG.webp)
          .toFile(path.join(dirname, `${basename}_${size}w.webp`));
        
        // AVIF responsivo (se disponível)
        try {
          await image
            .resize(size, null, { withoutEnlargement: true })
            .avif(OPTIMIZATION_CONFIG.avif)
            .toFile(path.join(dirname, `${basename}_${size}w.avif`));
        } catch (error) {
          // AVIF pode não estar disponível em todos os sistemas
        }
      }
    }
    
    console.log(`  ✅ Otimização concluída`);
    
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${imagePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...\n');
  
  const allImages = [];
  
  for (const directory of IMAGE_DIRECTORIES) {
    const images = await findImages(directory);
    allImages.push(...images);
  }
  
  if (allImages.length === 0) {
    console.log('Nenhuma imagem encontrada para otimizar.');
    return;
  }
  
  console.log(`📸 Encontradas ${allImages.length} imagens para otimizar:\n`);
  
  for (const imagePath of allImages) {
    await optimizeImage(imagePath);
    console.log(''); // Linha em branco para separar
  }
  
  console.log('✨ Otimização de imagens concluída!\n');
  console.log('💡 Dicas:');
  console.log('  - Use as versões .webp para navegadores modernos');
  console.log('  - Use as versões .avif para máxima compressão');
  console.log('  - Implemente srcset para imagens responsivas');
  console.log('  - Configure seu servidor para servir o formato mais adequado');
}

main().catch(console.error); 