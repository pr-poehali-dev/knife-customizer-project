import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ConfigOption {
  id: string;
  name: string;
  price: number;
}

interface Config {
  blades: string[];
  finish: string;
  springs: boolean;
  sheath: string;
  toolkit: boolean;
  oilcan: boolean;
  packaging: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'configurator' | 'gallery' | 'about'>('configurator');
  const [currentImage, setCurrentImage] = useState('https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/2fa9c414-50bb-445c-898c-5479aa25d007.jpg');
  const [imageKey, setImageKey] = useState(0);
  
  const [config, setConfig] = useState<Config>({
    blades: [],
    finish: 'satin',
    springs: false,
    sheath: 'none',
    toolkit: false,
    oilcan: false,
    packaging: 'bag'
  });

  const bladeOptions: ConfigOption[] = [
    { id: 'tanto', name: 'Танто', price: 8500 },
    { id: 'finnish', name: 'Финский', price: 7800 },
    { id: 'dagger', name: 'Кортик', price: 9500 },
    { id: 'standard', name: 'Стандарт', price: 8200 }
  ];

  const finishOptions = [
    { id: 'satin', name: 'Сатин', price: 0 },
    { id: 'stonewash', name: 'Стоунвош', price: 1200 },
    { id: 'blackwash', name: 'Блеквош', price: 1500 }
  ];

  const sheathOptions = [
    { id: 'none', name: 'Без ножен', price: 0 },
    { id: 'kydex', name: 'Кайдекс', price: 2500 },
    { id: 'leather', name: 'Кожа', price: 3800 }
  ];

  const packagingOptions = [
    { id: 'bag', name: 'Пакет', price: 0 },
    { id: 'wooden-box', name: 'Деревянный футляр', price: 4500 }
  ];

  const knifeImages: Record<string, string> = {
    'tanto-satin': 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/fc6745f0-61fe-483b-90ad-a32b7f7bc0c3.jpg',
    'tanto-blackwash': 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg',
    'finnish-stonewash': 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/1df3ceaa-6581-4a1b-9056-7de4914d831b.jpg',
    'standard-satin': 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/cdeaf906-9a25-4202-905d-deaf64047ae7.jpg',
    'default': 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/2fa9c414-50bb-445c-898c-5479aa25d007.jpg'
  };

  useEffect(() => {
    if (config.blades.length > 0) {
      const blade = config.blades[0];
      const finish = config.finish;
      const key = `${blade}-${finish}`;
      const newImage = knifeImages[key] || knifeImages['default'];
      
      if (newImage !== currentImage) {
        setCurrentImage(newImage);
        setImageKey(prev => prev + 1);
      }
    } else {
      if (currentImage !== knifeImages['default']) {
        setCurrentImage(knifeImages['default']);
        setImageKey(prev => prev + 1);
      }
    }
  }, [config.blades, config.finish]);

  const calculateTotal = (): number => {
    let total = 0;
    
    config.blades.forEach(bladeId => {
      const blade = bladeOptions.find(b => b.id === bladeId);
      if (blade) total += blade.price;
    });
    
    const finish = finishOptions.find(f => f.id === config.finish);
    if (finish) total += finish.price;
    
    if (config.springs) total += 800;
    
    const sheath = sheathOptions.find(s => s.id === config.sheath);
    if (sheath) total += sheath.price;
    
    if (config.toolkit) total += 1200;
    if (config.oilcan) total += 450;
    
    const packaging = packagingOptions.find(p => p.id === config.packaging);
    if (packaging) total += packaging.price;
    
    return total;
  };

  const toggleBlade = (bladeId: string) => {
    setConfig(prev => ({
      ...prev,
      blades: prev.blades.includes(bladeId)
        ? prev.blades.filter(id => id !== bladeId)
        : [...prev.blades, bladeId]
    }));
  };

  const galleryItems = [
    { 
      id: 1, 
      title: 'Tanto Blackwash', 
      description: 'Кастомный нож с клинком Tanto и обработкой Blackwash',
      image: 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg'
    },
    { 
      id: 2, 
      title: 'Drop Point Stonewash', 
      description: 'Классический Drop Point с текстурой Stonewash',
      image: 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/a345210d-ec6a-4f60-bf44-a28bea931f0f.jpg'
    },
    { 
      id: 3, 
      title: 'Spear Point Satin', 
      description: 'Элегантный Spear Point с зеркальной полировкой Satin',
      image: 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/cdeaf906-9a25-4202-905d-deaf64047ae7.jpg'
    },
    { 
      id: 4, 
      title: 'Dagger Premium', 
      description: 'Премиальный двухсторонний клинок с кожаными ножнами',
      image: 'https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2 lg:gap-3">
              <Icon name="Sword" size={28} className="text-accent lg:w-8 lg:h-8" />
              Assasin's Blade
            </h1>
            <nav className="flex gap-4 lg:gap-8">
              <button
                onClick={() => setActiveSection('configurator')}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'configurator' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Конфигуратор
              </button>
              <button
                onClick={() => setActiveSection('gallery')}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'gallery' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Галерея
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О бренде
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 lg:py-12">
        {activeSection === 'configurator' && (
          <>
            {/* Десктопная версия */}
            <div className="hidden lg:block">
              <div className="space-y-6 mb-8">
                <h2 className="text-4xl font-bold">Создайте свой нож</h2>
                <p className="text-muted-foreground text-lg">
                  Выберите опции для создания уникального выкидного ножа ручной работы
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Большое фото наверху */}
                  <Card className="p-0 overflow-hidden bg-card border-border/40">
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/50 to-background">
                      <img 
                        key={imageKey}
                        src={currentImage}
                        alt="Комплект ножа"
                        className="w-full h-full object-cover animate-fade-in"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-6">
                        <p className="text-sm text-muted-foreground">
                          {config.blades.length > 0 
                            ? `Выбрано клинков: ${config.blades.length} • ${finishOptions.find(f => f.id === config.finish)?.name}`
                            : 'Выберите клинки для начала конфигурации'
                          }
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Конфигурации */}
                  <Card className="p-6 space-y-6 bg-card border-border/40">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Layers" size={24} className="text-accent" />
                        <h3 className="text-xl font-semibold">Выбор клинков</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Можно выбрать несколько вариантов</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {bladeOptions.map(blade => (
                          <div
                            key={blade.id}
                            onClick={() => toggleBlade(blade.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                              config.blades.includes(blade.id)
                                ? 'border-accent bg-accent/10'
                                : 'border-border/40 hover:border-border'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={config.blades.includes(blade.id)}
                                onCheckedChange={() => toggleBlade(blade.id)}
                              />
                              <Label className="cursor-pointer flex-1">
                                <p className="font-medium">{blade.name}</p>
                                <p className="text-sm text-muted-foreground">{blade.price.toLocaleString()} ₽</p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-border/40" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Sparkles" size={24} className="text-accent" />
                        <h3 className="text-xl font-semibold">Обработка клинка</h3>
                      </div>
                      <RadioGroup value={config.finish} onValueChange={(value) => setConfig(prev => ({ ...prev, finish: value }))}>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {finishOptions.map(finish => (
                            <div
                              key={finish.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                                config.finish === finish.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border/40 hover:border-border'
                              }`}
                              onClick={() => setConfig(prev => ({ ...prev, finish: finish.id }))}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={finish.id} id={`finish-${finish.id}`} />
                                <Label htmlFor={`finish-${finish.id}`} className="cursor-pointer flex-1">
                                  <p className="font-medium">{finish.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {finish.price === 0 ? 'Бесплатно' : `+${finish.price.toLocaleString()} ₽`}
                                  </p>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator className="bg-border/40" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Package" size={24} className="text-accent" />
                        <h3 className="text-xl font-semibold">Дополнительно</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div
                          onClick={() => setConfig(prev => ({ ...prev, springs: !prev.springs }))}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                            config.springs
                              ? 'border-accent bg-accent/10'
                              : 'border-border/40 hover:border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={config.springs} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, springs: checked as boolean }))} />
                            <Label className="cursor-pointer flex-1">
                              <p className="font-medium">Запасные пружины</p>
                              <p className="text-sm text-muted-foreground">+800 ₽</p>
                            </Label>
                          </div>
                        </div>

                        <div
                          onClick={() => setConfig(prev => ({ ...prev, toolkit: !prev.toolkit }))}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                            config.toolkit
                              ? 'border-accent bg-accent/10'
                              : 'border-border/40 hover:border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={config.toolkit} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, toolkit: checked as boolean }))} />
                            <Label className="cursor-pointer flex-1">
                              <p className="font-medium">Набор отвёрток</p>
                              <p className="text-sm text-muted-foreground">+1 200 ₽</p>
                            </Label>
                          </div>
                        </div>

                        <div
                          onClick={() => setConfig(prev => ({ ...prev, oilcan: !prev.oilcan }))}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                            config.oilcan
                              ? 'border-accent bg-accent/10'
                              : 'border-border/40 hover:border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={config.oilcan} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, oilcan: checked as boolean }))} />
                            <Label className="cursor-pointer flex-1">
                              <p className="font-medium">Масленка</p>
                              <p className="text-sm text-muted-foreground">+450 ₽</p>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/40" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Shield" size={24} className="text-accent" />
                        <h3 className="text-xl font-semibold">Ножны</h3>
                      </div>
                      <RadioGroup value={config.sheath} onValueChange={(value) => setConfig(prev => ({ ...prev, sheath: value }))}>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {sheathOptions.map(sheath => (
                            <div
                              key={sheath.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                                config.sheath === sheath.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border/40 hover:border-border'
                              }`}
                              onClick={() => setConfig(prev => ({ ...prev, sheath: sheath.id }))}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={sheath.id} id={`sheath-${sheath.id}`} />
                                <Label htmlFor={`sheath-${sheath.id}`} className="cursor-pointer flex-1">
                                  <p className="font-medium">{sheath.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {sheath.price === 0 ? 'Бесплатно' : `+${sheath.price.toLocaleString()} ₽`}
                                  </p>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator className="bg-border/40" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Gift" size={24} className="text-accent" />
                        <h3 className="text-xl font-semibold">Упаковка</h3>
                      </div>
                      <RadioGroup value={config.packaging} onValueChange={(value) => setConfig(prev => ({ ...prev, packaging: value }))}>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {packagingOptions.map(pkg => (
                            <div
                              key={pkg.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                                config.packaging === pkg.id
                                  ? 'border-accent bg-accent/10'
                                  : 'border-border/40 hover:border-border'
                              }`}
                              onClick={() => setConfig(prev => ({ ...prev, packaging: pkg.id }))}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={pkg.id} id={`pkg-${pkg.id}`} />
                                <Label htmlFor={`pkg-${pkg.id}`} className="cursor-pointer flex-1">
                                  <p className="font-medium">{pkg.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {pkg.price === 0 ? 'Бесплатно' : `+${pkg.price.toLocaleString()} ₽`}
                                  </p>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="p-6 sticky top-24 bg-card border-border/40">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Ваша конфигурация</h3>
                        <p className="text-sm text-muted-foreground">Итоговая стоимость</p>
                      </div>

                      <Separator className="bg-border/40" />

                      <div className="space-y-3 text-sm">
                        {config.blades.length > 0 && (
                          <div>
                            <p className="text-muted-foreground mb-1">Клинки:</p>
                            {config.blades.map(bladeId => {
                              const blade = bladeOptions.find(b => b.id === bladeId);
                              return (
                                <div key={bladeId} className="flex justify-between">
                                  <span>• {blade?.name}</span>
                                  <span>{blade?.price.toLocaleString()} ₽</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {config.finish && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Обработка:</span>
                            <span>{finishOptions.find(f => f.id === config.finish)?.name}</span>
                          </div>
                        )}

                        {config.springs && (
                          <div className="flex justify-between">
                            <span>• Запасные пружины</span>
                            <span>800 ₽</span>
                          </div>
                        )}

                        {config.sheath !== 'none' && (
                          <div className="flex justify-between">
                            <span>• {sheathOptions.find(s => s.id === config.sheath)?.name}</span>
                            <span>{sheathOptions.find(s => s.id === config.sheath)?.price.toLocaleString()} ₽</span>
                          </div>
                        )}

                        {config.toolkit && (
                          <div className="flex justify-between">
                            <span>• Набор отвёрток</span>
                            <span>1 200 ₽</span>
                          </div>
                        )}

                        {config.oilcan && (
                          <div className="flex justify-between">
                            <span>• Масленка</span>
                            <span>450 ₽</span>
                          </div>
                        )}

                        {config.packaging === 'wooden-box' && (
                          <div className="flex justify-between">
                            <span>• Деревянный футляр</span>
                            <span>4 500 ₽</span>
                          </div>
                        )}
                      </div>

                      <Separator className="bg-border/40" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-2xl font-bold">
                          <span>Итого:</span>
                          <span className="text-accent">{calculateTotal().toLocaleString()} ₽</span>
                        </div>

                        <Button 
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg"
                          disabled={config.blades.length === 0}
                        >
                          Оформить заказ
                        </Button>

                        {config.blades.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center">
                            Выберите хотя бы один клинок для продолжения
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden flex flex-col h-[calc(100vh-8rem)] gap-4">
              {/* Фото ножа - верхняя часть */}
              <Card className="p-0 overflow-hidden bg-card border-border/40 h-[45vh]">
                <div className="relative h-full bg-gradient-to-br from-muted/50 to-background">
                  <img 
                    key={imageKey}
                    src={currentImage}
                    alt="Комплект ножа"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-3">
                    <p className="text-xs text-muted-foreground">
                      {config.blades.length > 0 
                        ? `${config.blades.length} клинков • ${finishOptions.find(f => f.id === config.finish)?.name}`
                        : 'Выберите клинки'
                      }
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold">Итого:</span>
                      <span className="text-lg font-bold text-accent">{calculateTotal().toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Горизонтальная прокрутка конфигураций */}
              <div className="flex-1 overflow-hidden">
                <div className="flex gap-3 h-full overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
                  {/* Карточка: Клинки */}
                  <Card className="min-w-[85vw] snap-center p-4 bg-card border-border/40 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Layers" size={20} className="text-accent" />
                      <h3 className="font-semibold">Клинки</h3>
                    </div>
                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {bladeOptions.map(blade => (
                        <div
                          key={blade.id}
                          onClick={() => toggleBlade(blade.id)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            config.blades.includes(blade.id)
                              ? 'border-accent bg-accent/10'
                              : 'border-border/40'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox checked={config.blades.includes(blade.id)} />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{blade.name}</p>
                              <p className="text-xs text-muted-foreground">{blade.price.toLocaleString()} ₽</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Карточка: Обработка */}
                  <Card className="min-w-[85vw] snap-center p-4 bg-card border-border/40 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Sparkles" size={20} className="text-accent" />
                      <h3 className="font-semibold">Обработка</h3>
                    </div>
                    <RadioGroup value={config.finish} onValueChange={(value) => setConfig(prev => ({ ...prev, finish: value }))}>
                      <div className="space-y-2">
                        {finishOptions.map(finish => (
                          <div
                            key={finish.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer ${
                              config.finish === finish.id
                                ? 'border-accent bg-accent/10'
                                : 'border-border/40'
                            }`}
                            onClick={() => setConfig(prev => ({ ...prev, finish: finish.id }))}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={finish.id} id={`mobile-finish-${finish.id}`} />
                              <Label htmlFor={`mobile-finish-${finish.id}`} className="flex-1 cursor-pointer">
                                <p className="font-medium text-sm">{finish.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {finish.price === 0 ? 'Бесплатно' : `+${finish.price.toLocaleString()} ₽`}
                                </p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Ножны */}
                  <Card className="min-w-[85vw] snap-center p-4 bg-card border-border/40 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Shield" size={20} className="text-accent" />
                      <h3 className="font-semibold">Ножны</h3>
                    </div>
                    <RadioGroup value={config.sheath} onValueChange={(value) => setConfig(prev => ({ ...prev, sheath: value }))}>
                      <div className="space-y-2">
                        {sheathOptions.map(sheath => (
                          <div
                            key={sheath.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer ${
                              config.sheath === sheath.id
                                ? 'border-accent bg-accent/10'
                                : 'border-border/40'
                            }`}
                            onClick={() => setConfig(prev => ({ ...prev, sheath: sheath.id }))}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={sheath.id} id={`mobile-sheath-${sheath.id}`} />
                              <Label htmlFor={`mobile-sheath-${sheath.id}`} className="flex-1 cursor-pointer">
                                <p className="font-medium text-sm">{sheath.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {sheath.price === 0 ? 'Бесплатно' : `+${sheath.price.toLocaleString()} ₽`}
                                </p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Дополнительно */}
                  <Card className="min-w-[85vw] snap-center p-4 bg-card border-border/40 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Package" size={20} className="text-accent" />
                      <h3 className="font-semibold">Дополнительно</h3>
                    </div>
                    <div className="space-y-2 flex-1 overflow-y-auto">
                      <div
                        onClick={() => setConfig(prev => ({ ...prev, springs: !prev.springs }))}
                        className={`p-3 rounded-lg border-2 cursor-pointer ${
                          config.springs ? 'border-accent bg-accent/10' : 'border-border/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.springs} />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Запасные пружины</p>
                            <p className="text-xs text-muted-foreground">+800 ₽</p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setConfig(prev => ({ ...prev, toolkit: !prev.toolkit }))}
                        className={`p-3 rounded-lg border-2 cursor-pointer ${
                          config.toolkit ? 'border-accent bg-accent/10' : 'border-border/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.toolkit} />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Набор отвёрток</p>
                            <p className="text-xs text-muted-foreground">+1 200 ₽</p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setConfig(prev => ({ ...prev, oilcan: !prev.oilcan }))}
                        className={`p-3 rounded-lg border-2 cursor-pointer ${
                          config.oilcan ? 'border-accent bg-accent/10' : 'border-border/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.oilcan} />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Масленка</p>
                            <p className="text-xs text-muted-foreground">+450 ₽</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Карточка: Упаковка и заказ */}
                  <Card className="min-w-[85vw] snap-center p-4 bg-card border-border/40 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Gift" size={20} className="text-accent" />
                      <h3 className="font-semibold">Упаковка</h3>
                    </div>
                    <RadioGroup value={config.packaging} onValueChange={(value) => setConfig(prev => ({ ...prev, packaging: value }))}>
                      <div className="space-y-2 mb-4">
                        {packagingOptions.map(pkg => (
                          <div
                            key={pkg.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer ${
                              config.packaging === pkg.id
                                ? 'border-accent bg-accent/10'
                                : 'border-border/40'
                            }`}
                            onClick={() => setConfig(prev => ({ ...prev, packaging: pkg.id }))}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value={pkg.id} id={`mobile-pkg-${pkg.id}`} />
                              <Label htmlFor={`mobile-pkg-${pkg.id}`} className="flex-1 cursor-pointer">
                                <p className="font-medium text-sm">{pkg.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {pkg.price === 0 ? 'Бесплатно' : `+${pkg.price.toLocaleString()} ₽`}
                                </p>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    <Separator className="bg-border/40 my-4" />

                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6"
                      disabled={config.blades.length === 0}
                    >
                      Оформить заказ
                    </Button>

                    {config.blades.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Выберите хотя бы один клинок
                      </p>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'gallery' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Галерея работ</h2>
              <p className="text-muted-foreground text-lg">
                Изделия ручной работы от мастеров Assasin's Blade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {galleryItems.map(item => (
                <Card key={item.id} className="overflow-hidden border-border/40 hover:border-accent/50 transition-all">
                  <div className="aspect-video relative bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">О бренде Assasin's Blade</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Assasin's Blade — это мастерская по созданию уникальных выкидных ножей ручной работы. 
                  Мы специализируемся на производстве кастомизируемых ножей высочайшего качества.
                </p>
                <p>
                  Каждый нож создается с использованием современных технологий и традиционных методов 
                  кузнечного мастерства. Мы используем только лучшие материалы: высокоуглеродистую сталь 
                  для клинков и натуральные материалы для рукоятей.
                </p>
                <p>
                  Наша философия — создание не просто инструмента, а произведения искусства, которое 
                  прослужит владельцу долгие годы и станет надежным спутником в любых условиях.
                </p>
              </div>
            </div>

            <Separator className="bg-border/40" />

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-accent">10+</div>
                <p className="text-sm text-muted-foreground">Лет опыта</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-accent">500+</div>
                <p className="text-sm text-muted-foreground">Изделий создано</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-accent">100%</div>
                <p className="text-sm text-muted-foreground">Ручная работа</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
