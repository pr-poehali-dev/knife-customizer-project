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
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Icon name="Sword" size={32} className="text-accent" />
              Assasin's Blade
            </h1>
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveSection('configurator')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'configurator' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Конфигуратор
              </button>
              <button
                onClick={() => setActiveSection('gallery')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'gallery' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Галерея работ
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О бренде
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'configurator' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold">Создайте свой нож</h2>
                <p className="text-muted-foreground text-lg">
                  Выберите опции для создания уникального выкидного ножа ручной работы
                </p>
              </div>

              <Card className="p-0 overflow-hidden bg-card border-border/40">
                <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-background">
                  <img 
                    key={imageKey}
                    src={currentImage}
                    alt="Комплект ножа"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                    <p className="text-sm text-muted-foreground">
                      {config.blades.length > 0 
                        ? `Выбрано клинков: ${config.blades.length} • ${finishOptions.find(f => f.id === config.finish)?.name}`
                        : 'Выберите клинки для начала конфигурации'
                      }
                    </p>
                  </div>
                </div>
              </Card>

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
                          <div className="flex-1">
                            <p className="font-medium">{blade.name}</p>
                            <p className="text-sm text-muted-foreground">+{blade.price.toLocaleString()} ₽</p>
                          </div>
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
                            <RadioGroupItem value={finish.id} id={finish.id} />
                            <Label htmlFor={finish.id} className="cursor-pointer flex-1">
                              <p className="font-medium">{finish.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {finish.price === 0 ? 'Включено' : `+${finish.price.toLocaleString()} ₽`}
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
                    <Icon name="Settings" size={24} className="text-accent" />
                    <h3 className="text-xl font-semibold">Дополнительные опции</h3>
                  </div>
                  <div className="space-y-3">
                    <div
                      onClick={() => setConfig(prev => ({ ...prev, springs: !prev.springs }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.01] ${
                        config.springs ? 'border-accent bg-accent/10' : 'border-border/40 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox checked={config.springs} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, springs: !!checked }))} />
                          <div>
                            <p className="font-medium">Запасные пружины</p>
                            <p className="text-sm text-muted-foreground">Комплект из 2 пружин</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">+800 ₽</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setConfig(prev => ({ ...prev, toolkit: !prev.toolkit }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.01] ${
                        config.toolkit ? 'border-accent bg-accent/10' : 'border-border/40 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox checked={config.toolkit} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, toolkit: !!checked }))} />
                          <div>
                            <p className="font-medium">Набор отвёрток</p>
                            <p className="text-sm text-muted-foreground">Для обслуживания механизма</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">+1 200 ₽</p>
                      </div>
                    </div>

                    <div
                      onClick={() => setConfig(prev => ({ ...prev, oilcan: !prev.oilcan }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.01] ${
                        config.oilcan ? 'border-accent bg-accent/10' : 'border-border/40 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox checked={config.oilcan} onCheckedChange={(checked) => setConfig(prev => ({ ...prev, oilcan: !!checked }))} />
                          <div>
                            <p className="font-medium">Масленка</p>
                            <p className="text-sm text-muted-foreground">Масло для ножей премиум-класса</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">+450 ₽</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Package" size={24} className="text-accent" />
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
        )}

        {activeSection === 'gallery' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Галерея работ</h2>
              <p className="text-muted-foreground text-lg">
                Примеры кастомных ножей, созданных нашими мастерами
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {galleryItems.map(item => (
                <Card key={item.id} className="overflow-hidden bg-card border-border/40 hover:border-accent/50 transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">О бренде</h2>
              <p className="text-muted-foreground text-lg">
                Философия мастерства и качества
              </p>
            </div>

            <Card className="p-8 bg-card border-border/40 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Award" size={32} className="text-accent" />
                  <h3 className="text-2xl font-bold">Assasin's Blade</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  Мы создаём кастомные выкидные ножи премиум-класса, где каждая деталь продумана до совершенства. 
                  Наши мастера используют только лучшие материалы и проверенные технологии для создания ножей, 
                  которые служат не один десяток лет.
                </p>
              </div>

              <Separator className="bg-border/40" />

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Icon name="Shield" size={28} className="text-accent mb-2" />
                  <h4 className="font-semibold">Качество</h4>
                  <p className="text-sm text-muted-foreground">
                    Каждый нож проходит строгий контроль качества перед отправкой клиенту
                  </p>
                </div>
                <div className="space-y-2">
                  <Icon name="Hammer" size={28} className="text-accent mb-2" />
                  <h4 className="font-semibold">Ручная работа</h4>
                  <p className="text-sm text-muted-foreground">
                    Все ножи изготавливаются вручную опытными мастерами
                  </p>
                </div>
                <div className="space-y-2">
                  <Icon name="Gem" size={28} className="text-accent mb-2" />
                  <h4 className="font-semibold">Уникальность</h4>
                  <p className="text-sm text-muted-foreground">
                    Создаём ножи по вашим индивидуальным предпочтениям
                  </p>
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Наши материалы</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                    <span>Высокоуглеродистая сталь премиум-класса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                    <span>Натуральная кожа и кайдекс для ножен</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                    <span>Надёжные механизмы собственного производства</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-accent mt-0.5" />
                    <span>Экологичные покрытия и отделка</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Assasin's Blade. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Контакты</a>
              <a href="#" className="hover:text-primary transition-colors">Доставка</a>
              <a href="#" className="hover:text-primary transition-colors">Гарантия</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;