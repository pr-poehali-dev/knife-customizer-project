import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface ConfigOption {
  id: string;
  name: string;
  price: number;
}

interface Config {
  blades: string[];
  finish: string;
  body: string;
  mechanism: string;
  springs: boolean;
  sheath: string;
  toolkit: boolean;
  oilcan: boolean;
  packaging: string;
  gift: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<
    "configurator" | "gallery" | "about"
  >("configurator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCard, setMobileActiveCard] = useState(0);
  const [currentImage, setCurrentImage] = useState(
    "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/2fa9c414-50bb-445c-898c-5479aa25d007.jpg",
  );
  const [imageKey, setImageKey] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  const [config, setConfig] = useState<Config>({
    blades: [],
    finish: "satin",
    body: "none",
    mechanism: "none",
    springs: false,
    sheath: "none",
    toolkit: false,
    oilcan: false,
    packaging: "bag",
    gift: false,
  });

  const bladeOptions: ConfigOption[] = [
    { id: "tanto", name: "Танто", price: 3500 },
    { id: "finnish", name: "Финский", price: 4200 },
    { id: "dagger", name: "Навахо", price: 3550 },
    { id: "standard", name: "Стандарт", price: 3300 },
  ];

  const finishOptions = [
    { id: "satin", name: "Сатин", price: 0 },
    { id: "stonewash", name: "Стоунвош", price: 550 },
    { id: "blackwash", name: "Блеквош", price: 950 },
  ];

  const bodyOptions = [
    { id: "none", name: "Без корпуса", price: 0 },
    { id: "aluminum", name: "Прочный сплав алюминия", price: 1350 },
  ];

  const mechanismOptions = [
    { id: "none", name: "Без механизма", price: 0 },
    {
      id: "double-spring",
      name: "Надежный механизм с двумя пружинами",
      price: 1350,
    },
  ];

  const sheathOptions = [
    { id: "none", name: "Без ножен", price: 0 },
    { id: "kydex", name: "Кайдекс", price: 1950 },
    { id: "leather", name: "Кожа", price: 1350 },
  ];

  const packagingOptions = [
    { id: "bag", name: "Пакет", price: 0 },
    { id: "wooden-box", name: "Деревянный футляр", price: 1550 },
  ];

  const specificationsData: Record<string, { title: string; specs: string[] }> =
    {
      tanto: {
        title: "Танто",
        specs: [
          "Длина клинка: 95 мм",
          "Толщина обуха: 3.5 мм",
          "Сталь: 440C",
          "Твёрдость: 60+ HRC",
          "Острый угол заточки",
          "Идеален для точных работ",
        ],
      },
      finnish: {
        title: "Финский",
        specs: [
          "Длина клинка: 105 мм",
          "Толщина обуха: 4.0 мм",
          "Сталь: 440C",
          "Твёрдость: 58-60 HRC",
          "Классическая форма",
          "Универсальное применение",
        ],
      },
      dagger: {
        title: "Кортик",
        specs: [
          "Длина клинка: 110 мм",
          "Толщина обуха: 3.8 мм",
          "Сталь: 440C",
          "Твёрдость: 58-60 HRC",
          "Двусторонняя заточка",
          "Элегантный дизайн",
        ],
      },
      standard: {
        title: "Стандарт",
        specs: [
          "Длина клинка: 100 мм",
          "Толщина обуха: 3.5 мм",
          "Сталь: 440C",
          "Твёрдость: 58-60 HRC",
          "Универсальная форма",
          "Оптимальный баланс",
        ],
      },
      satin: {
        title: "Сатин",
        specs: [
          "Матовая полировка",
          "Устойчивость к царапинам",
          "Классический вид",
          "Легкий уход",
          "Базовая обработка",
        ],
      },
      stonewash: {
        title: "Стоунвош",
        specs: [
          "Текстурированная поверхность",
          "Скрывает следы использования",
          "Улучшенная коррозионная стойкость",
          "Тактильная текстура",
          "Премиальный вид",
        ],
      },
      blackwash: {
        title: "Блеквош",
        specs: [
          "Чёрное покрытие",
          "Максимальная стойкость",
          "Агрессивный дизайн",
          "Антибликовое покрытие",
          "Премиум обработка",
        ],
      },
      "none-body": {
        title: "Без корпуса",
        specs: [
          "Минималистичный дизайн",
          "Лёгкий вес",
          "Компактные размеры",
          "Базовая комплектация",
        ],
      },
      aluminum: {
        title: "Прочный сплав алюминия",
        specs: [
          "Авиационный алюминий 6061-T6",
          "Анодированное покрытие",
          "Вес корпуса: 45 г",
          "Защита от ударов",
          "Эргономичная форма",
        ],
      },
      "none-sheath": {
        title: "Без ножен",
        specs: [
          "Компактная переноска",
          "Минимальный вес",
          "Базовая комплектация",
        ],
      },
      kydex: {
        title: "Кайдекс",
        specs: [
          "Термопластичный полимер",
          "Влагостойкий материал",
          "Фиксация с щелчком",
          "Крепление на пояс",
          "Долговечность 10+ лет",
        ],
      },
      leather: {
        title: "Кожа",
        specs: [
          "Натуральная воловья кожа",
          "Ручная прошивка",
          "Классический вид",
          "Формуется под нож",
          "Премиальное исполнение",
        ],
      },
      bag: {
        title: "Пакет",
        specs: [
          "Плотный полиэтилен",
          "Базовая упаковка",
          "Защита при транспортировке",
        ],
      },
      "wooden-box": {
        title: "Деревянный футляр",
        specs: [
          "Массив дуба",
          "Бархатная подложка",
          "Гравировка логотипа",
          "Подарочное оформление",
          "Защита при хранении",
        ],
      },
      springs: {
        title: "Дополнительные пружины",
        specs: [
          "Комплект из 3 пружин",
          "Различная жёсткость",
          "Нержавеющая сталь",
          "Гарантия 1 год",
        ],
      },
      toolkit: {
        title: "Набор инструментов",
        specs: [
          "Отвёртка Torx T6, T8",
          "Шестигранник 2-5 мм",
          "Масло для смазки",
          "Салфетка из микрофибры",
          "Компактный чехол",
        ],
      },
      oilcan: {
        title: "Масленка",
        specs: [
          "Объём: 10 мл",
          "Синтетическое масло",
          "Точный дозатор",
          "Защита от коррозии",
        ],
      },
    };

  const knifeImages: Record<string, string> = {
    "tanto-satin":
      "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/fc6745f0-61fe-483b-90ad-a32b7f7bc0c3.jpg",
    "tanto-blackwash":
      "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg",
    "finnish-stonewash":
      "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/1df3ceaa-6581-4a1b-9056-7de4914d831b.jpg",
    "standard-satin":
      "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/cdeaf906-9a25-4202-905d-deaf64047ae7.jpg",
    default:
      "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/2fa9c414-50bb-445c-898c-5479aa25d007.jpg",
  };

  useEffect(() => {
    if (config.blades.length > 0) {
      const blade = config.blades[0];
      const finish = config.finish;
      const key = `${blade}-${finish}`;
      const newImage = knifeImages[key] || knifeImages["default"];

      if (newImage !== currentImage) {
        setCurrentImage(newImage);
        setImageKey((prev) => prev + 1);
      }
    } else {
      if (currentImage !== knifeImages["default"]) {
        setCurrentImage(knifeImages["default"]);
        setImageKey((prev) => prev + 1);
      }
    }
  }, [config.blades, config.finish]);

  useEffect(() => {
    if (!hasInteracted && getCurrentSpecs().length > 0) {
      setInfoOpen(true);
      setHasInteracted(true);
    }
  }, [config, hasInteracted]);

  const calculateTotal = (): number => {
    let total = 0;

    config.blades.forEach((bladeId) => {
      const blade = bladeOptions.find((b) => b.id === bladeId);
      if (blade) total += blade.price;
    });

    const finish = finishOptions.find((f) => f.id === config.finish);
    if (finish) total += finish.price;

    const body = bodyOptions.find((b) => b.id === config.body);
    if (body) total += body.price;

    const mechanism = mechanismOptions.find((m) => m.id === config.mechanism);
    if (mechanism) total += mechanism.price;

    if (config.springs) total += 800;

    const sheath = sheathOptions.find((s) => s.id === config.sheath);
    if (sheath) total += sheath.price;

    if (config.toolkit) total += 1200;
    if (config.oilcan) total += 450;

    const packaging = packagingOptions.find((p) => p.id === config.packaging);
    if (packaging) total += packaging.price;

    return total;
  };

  const toggleBlade = (bladeId: string) => {
    setConfig((prev) => ({
      ...prev,
      blades: prev.blades.includes(bladeId)
        ? prev.blades.filter((id) => id !== bladeId)
        : [...prev.blades, bladeId],
    }));
  };

  const getCurrentSpecs = () => {
    const specs: Array<{ title: string; specs: string[] }> = [];

    config.blades.forEach((bladeId) => {
      if (specificationsData[bladeId]) {
        specs.push(specificationsData[bladeId]);
      }
    });

    const finishOption = finishOptions.find((f) => f.id === config.finish);
    if (
      finishOption &&
      finishOption.price > 0 &&
      specificationsData[config.finish]
    ) {
      specs.push(specificationsData[config.finish]);
    }

    const bodyOption = bodyOptions.find((b) => b.id === config.body);
    if (bodyOption && bodyOption.price > 0 && specificationsData[config.body]) {
      specs.push(specificationsData[config.body]);
    }

    const sheathOption = sheathOptions.find((s) => s.id === config.sheath);
    if (
      sheathOption &&
      sheathOption.price > 0 &&
      specificationsData[config.sheath]
    ) {
      specs.push(specificationsData[config.sheath]);
    }

    if (config.springs && specificationsData["springs"]) {
      specs.push(specificationsData["springs"]);
    }

    if (config.toolkit && specificationsData["toolkit"]) {
      specs.push(specificationsData["toolkit"]);
    }

    if (config.oilcan && specificationsData["oilcan"]) {
      specs.push(specificationsData["oilcan"]);
    }

    const packagingOption = packagingOptions.find(
      (p) => p.id === config.packaging,
    );
    if (
      packagingOption &&
      packagingOption.price > 0 &&
      specificationsData[config.packaging]
    ) {
      specs.push(specificationsData[config.packaging]);
    }

    return specs;
  };

  const galleryItems = [
    {
      id: 1,
      title: "Tanto Blackwash",
      description: "Кастомный нож с клинком Tanto и обработкой Blackwash",
      image:
        "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg",
    },
    {
      id: 2,
      title: "Drop Point Stonewash",
      description: "Классический Drop Point с текстурой Stonewash",
      image:
        "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/a345210d-ec6a-4f60-bf44-a28bea931f0f.jpg",
    },
    {
      id: 3,
      title: "Spear Point Satin",
      description: "Элегантный Spear Point с зеркальной полировкой Satin",
      image:
        "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/cdeaf906-9a25-4202-905d-deaf64047ae7.jpg",
    },
    {
      id: 4,
      title: "Dagger Premium",
      description: "Премиальный двухсторонний клинок с кожаными ножнами",
      image:
        "https://cdn.poehali.dev/projects/411d1c8a-e6f1-4727-828f-d72a38a8d23c/files/66e0c02f-2c92-45fb-970c-b8cdbb27d962.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {welcomeModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-6 lg:p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.poehali.dev/files/5af04389-7ef4-454b-be3d-4095885f2945.png"
                alt="Assasin's Blade"
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-2xl lg:text-3xl font-bold">
                Assasin's Blade
              </h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent">
                Лучшие выкидные ножи в&nbsp;России
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-accent mt-0.5 flex-shrink-0"
                  />
                  <span className="text-muted-foreground">
                    Собственное производство с&nbsp;2018-го года (не&nbsp;Китай)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-accent mt-0.5 flex-shrink-0"
                  />
                  <span className="text-muted-foreground">
                    Сменные клинки твердостью 60+&nbsp;HRc
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-accent mt-0.5 flex-shrink-0"
                  />
                  <span className="text-muted-foreground">
                    Корпус из стали и сплава алюминия
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon
                    name="Check"
                    size={20}
                    className="text-accent mt-0.5 flex-shrink-0"
                  />
                  <span className="text-muted-foreground">
                    Собери свой комплект сегодня и&nbsp;
                    <span className="text-accent font-bold">
                      получи подарок
                    </span>{" "}
                    в&nbsp;конце!
                  </span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => setWelcomeModalOpen(false)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold"
            >
              <Icon name="Settings" size={20} className="mr-2" />В конфигуратор
            </Button>
          </Card>
        </div>
      )}

      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2 lg:gap-3">
              <img
                src="https://cdn.poehali.dev/files/5af04389-7ef4-454b-be3d-4095885f2945.png"
                alt="Assasin's Blade"
                className="w-7 h-7 lg:w-9 lg:h-9 object-contain"
              />
              Assasin's Blade
            </h1>
            {/* Десктоп меню */}
            <nav className="hidden lg:flex gap-8">
              <button
                onClick={() => setActiveSection("configurator")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "configurator"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Конфигуратор
              </button>
              <button
                onClick={() => setActiveSection("gallery")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "gallery"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Галерея
              </button>
              <button
                onClick={() => setActiveSection("about")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "about"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                О бренде
              </button>
            </nav>

            {/* Мобильное меню (бургер) */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Меню"
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-0 top-12 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                  <button
                    onClick={() => {
                      setActiveSection("configurator");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10 ${
                      activeSection === "configurator"
                        ? "text-accent bg-accent/5"
                        : "text-foreground"
                    }`}
                  >
                    Конфигуратор
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection("gallery");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10 ${
                      activeSection === "gallery"
                        ? "text-accent bg-accent/5"
                        : "text-foreground"
                    }`}
                  >
                    Галерея
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection("about");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10 ${
                      activeSection === "about"
                        ? "text-accent bg-accent/5"
                        : "text-foreground"
                    }`}
                  >
                    О бренде
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-2 lg:py-3">
        {activeSection === "configurator" && (
          <>
            {/* Десктопная версия */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-3 lg:h-[calc(100vh-6rem)]">
              {/* Левая часть: Фото ножа - 50% ширины */}
              <Card className="p-0 overflow-hidden bg-card border-border/40">
                <div className="relative h-full bg-gradient-to-br from-muted/50 to-background">
                  <img
                    key={imageKey}
                    src={currentImage}
                    alt="Комплект ножа"
                    className="w-full h-full object-cover animate-fade-in"
                  />

                  {/* Иконка информации */}
                  <button
                    onClick={() => setInfoOpen(!infoOpen)}
                    className="absolute top-4 left-4 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg transition-all z-20"
                    aria-label="Информация о конфигурации"
                  >
                    <Icon name="Info" size={20} className="text-foreground" />
                  </button>

                  {/* Информационное окно */}
                  {infoOpen && getCurrentSpecs().length > 0 && (
                    <div className="absolute top-4 left-4 w-[40%] max-h-[60%] bg-background/95 backdrop-blur-md rounded-xl shadow-2xl border border-border/40 overflow-hidden z-30">
                      <div className="flex items-center justify-between p-3 border-b border-border/40">
                        <h3 className="font-semibold text-sm">
                          Характеристики
                        </h3>
                        <button
                          onClick={() => setInfoOpen(false)}
                          className="hover:bg-muted/50 rounded-full p-1 transition-colors"
                          aria-label="Закрыть"
                        >
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                      <div className="overflow-y-auto max-h-[calc(60vh-4rem)] p-3 space-y-3">
                        {getCurrentSpecs().map((spec, index) => (
                          <div key={index} className="space-y-1.5">
                            <h4 className="font-semibold text-xs text-accent">
                              {spec.title}
                            </h4>
                            <ul className="space-y-1">
                              {spec.specs.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-muted-foreground flex items-start gap-1.5"
                                >
                                  <Icon
                                    name="Check"
                                    size={14}
                                    className="text-accent mt-0.5 flex-shrink-0"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Правая часть: Конфигурация (сверху) + Итог (снизу) - 50% ширины */}
              <div className="flex flex-col gap-3 h-full">
                {/* Верхний блок: Карточки конфигурации - занимает ~58% высоты */}
                <div className="flex-[1.4] min-h-0 overflow-hidden flex flex-col gap-2 relative">
                  {/* Стрелка влево */}
                  {activeCard > 0 && (
                    <button
                      onClick={() => {
                        const container =
                          document.querySelector(".config-scroll");
                        if (container) {
                          const cardWidth =
                            container.querySelector(".snap-start")
                              ?.clientWidth || 400;
                          container.scrollTo({
                            left: (activeCard - 1) * cardWidth,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="absolute left-2 bottom-4 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-2 shadow-lg transition-all"
                      aria-label="Предыдущая карточка"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                  )}

                  {/* Стрелка вправо */}
                  {activeCard < 7 && (
                    <button
                      onClick={() => {
                        const container =
                          document.querySelector(".config-scroll");
                        if (container) {
                          const cardWidth =
                            container.querySelector(".snap-start")
                              ?.clientWidth || 400;
                          container.scrollTo({
                            left: (activeCard + 1) * cardWidth,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="absolute right-2 bottom-4 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-2 shadow-lg transition-all"
                      aria-label="Следующая карточка"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  )}

                  <div
                    className="config-scroll flex gap-3 overflow-x-auto snap-x snap-mandatory flex-1 pb-1 scrollbar-hide"
                    style={{ scrollbarWidth: "none" }}
                    onScroll={(e) => {
                      const scrollLeft = e.currentTarget.scrollLeft;
                      const cardWidth =
                        e.currentTarget.querySelector(".snap-start")
                          ?.clientWidth || 400;
                      const gap = 12;
                      const newActiveCard = Math.round(
                        scrollLeft / (cardWidth + gap),
                      );
                      setActiveCard(newActiveCard);
                    }}
                  >
                    {/* Карточка 1: Корпус */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Cpu" size={20} className="text-accent" />
                        <h3 className="text-base font-semibold">Корпус</h3>
                      </div>
                      <RadioGroup
                        value={config.body}
                        onValueChange={(value) =>
                          setConfig({ ...config, body: value })
                        }
                      >
                        <div className="space-y-2">
                          {bodyOptions.map((body) => (
                            <div
                              key={body.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <RadioGroupItem
                                value={body.id}
                                id={`body-${body.id}-desktop`}
                              />
                              <Label
                                htmlFor={`body-${body.id}-desktop`}
                                className="flex-1 flex items-center justify-between cursor-pointer"
                              >
                                <span>{body.name}</span>
                                <span className="text-sm text-muted-foreground font-medium">
                                  {body.price === 0
                                    ? "—"
                                    : `${body.price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </Card>

                    {/* Карточка 2: Механизм */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          name="Settings"
                          size={20}
                          className="text-accent"
                        />
                        <h3 className="text-base font-semibold">Механизм</h3>
                      </div>
                      <RadioGroup
                        value={config.mechanism}
                        onValueChange={(value) =>
                          setConfig({ ...config, mechanism: value })
                        }
                      >
                        <div className="space-y-2">
                          {mechanismOptions.map((mech) => (
                            <div
                              key={mech.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <RadioGroupItem
                                value={mech.id}
                                id={`mech-${mech.id}-desktop`}
                              />
                              <Label
                                htmlFor={`mech-${mech.id}-desktop`}
                                className="flex-1 flex items-center justify-between cursor-pointer"
                              >
                                <span>{mech.name}</span>
                                <span className="text-sm text-muted-foreground font-medium">
                                  {mech.price === 0
                                    ? "—"
                                    : `${mech.price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </Card>

                    {/* Карточка 3: Клинки */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Sword" size={20} className="text-accent" />
                        <h3 className="text-base font-semibold">Клинки</h3>
                      </div>
                      <div className="space-y-2">
                        {bladeOptions.map((blade) => (
                          <div
                            key={blade.id}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                          >
                            <Checkbox
                              id={`blade-${blade.id}-desktop`}
                              checked={config.blades.includes(blade.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setConfig({
                                    ...config,
                                    blades: [...config.blades, blade.id],
                                  });
                                } else {
                                  setConfig({
                                    ...config,
                                    blades: config.blades.filter(
                                      (id) => id !== blade.id,
                                    ),
                                  });
                                }
                              }}
                            />
                            <Label
                              htmlFor={`blade-${blade.id}-desktop`}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {blade.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {blade.price.toLocaleString("ru-RU")} ₽
                                </span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Карточка 4: Обработка */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          name="Sparkles"
                          size={20}
                          className="text-accent"
                        />
                        <h3 className="text-base font-semibold">Обработка</h3>
                      </div>
                      <RadioGroup
                        value={config.finish}
                        onValueChange={(value) =>
                          setConfig({ ...config, finish: value })
                        }
                      >
                        <div className="space-y-2">
                          {finishOptions.map((finish) => (
                            <div
                              key={finish.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <RadioGroupItem
                                value={finish.id}
                                id={`finish-${finish.id}-desktop`}
                              />
                              <Label
                                htmlFor={`finish-${finish.id}-desktop`}
                                className="flex-1 flex items-center justify-between cursor-pointer"
                              >
                                <span>{finish.name}</span>
                                <span className="text-sm text-muted-foreground font-medium">
                                  {finish.price === 0
                                    ? "Включено"
                                    : `${finish.price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </Card>

                    {/* Карточка 5: Ножны */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          name="Package"
                          size={20}
                          className="text-accent"
                        />
                        <h3 className="text-base font-semibold">Ножны</h3>
                      </div>
                      <RadioGroup
                        value={config.sheath}
                        onValueChange={(value) =>
                          setConfig({ ...config, sheath: value })
                        }
                      >
                        <div className="space-y-2">
                          {sheathOptions.map((sheath) => (
                            <div
                              key={sheath.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <RadioGroupItem
                                value={sheath.id}
                                id={`sheath-${sheath.id}-desktop`}
                              />
                              <Label
                                htmlFor={`sheath-${sheath.id}-desktop`}
                                className="flex-1 flex items-center justify-between cursor-pointer"
                              >
                                <span>{sheath.name}</span>
                                <span className="text-sm text-muted-foreground font-medium">
                                  {sheath.price === 0
                                    ? "—"
                                    : `${sheath.price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </Card>

                    {/* Карточка 6: Дополнительно */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Plus" size={20} className="text-accent" />
                        <h3 className="text-base font-semibold">
                          Дополнительно
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors">
                          <Checkbox
                            id="springs-desktop"
                            checked={config.springs}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                springs: checked as boolean,
                              })
                            }
                          />
                          <Label
                            htmlFor="springs-desktop"
                            className="flex-1 flex items-center justify-between cursor-pointer"
                          >
                            <span>Пружины</span>
                            <span className="text-sm text-muted-foreground font-medium">
                              800 ₽
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/10 transition-colors">
                          <Checkbox
                            id="toolkit-desktop"
                            checked={config.toolkit}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                toolkit: checked as boolean,
                              })
                            }
                          />
                          <Label
                            htmlFor="toolkit-desktop"
                            className="flex-1 flex items-center justify-between cursor-pointer"
                          >
                            <span>Инструменты</span>
                            <span className="text-sm text-muted-foreground font-medium">
                              1,200 ₽
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/10 transition-colors">
                          <Checkbox
                            id="oilcan-desktop"
                            checked={config.oilcan}
                            onCheckedChange={(checked) =>
                              setConfig({
                                ...config,
                                oilcan: checked as boolean,
                              })
                            }
                          />
                          <Label
                            htmlFor="oilcan-desktop"
                            className="flex-1 flex items-center justify-between cursor-pointer"
                          >
                            <span>Масленка</span>
                            <span className="text-sm text-muted-foreground font-medium">
                              450 ₽
                            </span>
                          </Label>
                        </div>
                      </div>
                    </Card>

                    {/* Карточка 7: Упаковка */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Gift" size={20} className="text-accent" />
                        <h3 className="text-base font-semibold">Упаковка</h3>
                      </div>
                      <RadioGroup
                        value={config.packaging}
                        onValueChange={(value) =>
                          setConfig({ ...config, packaging: value })
                        }
                      >
                        <div className="space-y-2">
                          {packagingOptions.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            >
                              <RadioGroupItem
                                value={pkg.id}
                                id={`pkg-${pkg.id}-desktop`}
                              />
                              <Label
                                htmlFor={`pkg-${pkg.id}-desktop`}
                                className="flex-1 flex items-center justify-between cursor-pointer"
                              >
                                <span>{pkg.name}</span>
                                <span className="text-sm text-muted-foreground font-medium">
                                  {pkg.price === 0
                                    ? "Включено"
                                    : `${pkg.price.toLocaleString("ru-RU")} ₽`}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </Card>

                    {/* Карточка 8: Подарок */}
                    <Card className="min-w-full snap-start p-3 bg-card border-border/40 flex-shrink-0 h-full overflow-y-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Gift" size={20} className="text-accent" />
                        <h3 className="text-base font-semibold">
                          Ваш подарок при заказе сегодня
                        </h3>
                      </div>
                      <div
                        onClick={() =>
                          setConfig({ ...config, gift: !config.gift })
                        }
                        className={`rounded-lg p-4 border-2 cursor-pointer transition-all ${
                          config.gift
                            ? "bg-accent/10 border-accent"
                            : "bg-accent/5 border-accent/20 hover:bg-accent/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={config.gift}
                              onCheckedChange={(checked) =>
                                setConfig({
                                  ...config,
                                  gift: checked as boolean,
                                })
                              }
                            />
                            <div>
                              <p className="font-medium text-foreground">
                                Финский клинок
                              </p>
                              <p className="text-xs text-muted-foreground line-through">
                                4 200 ₽
                              </p>
                              <p className="text-lg font-bold text-accent mt-1">
                                Бесплатно
                              </p>
                            </div>
                          </div>
                          <Icon
                            name="Gift"
                            size={48}
                            className="text-accent opacity-20"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Индикаторы карточек */}
                  <div className="flex justify-center gap-2 flex-shrink-0">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const container =
                            document.querySelector(".config-scroll");
                          if (container) {
                            const cardWidth =
                              container.querySelector(".snap-start")
                                ?.clientWidth || 400;
                            container.scrollTo({
                              left: cardWidth * index,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          activeCard === index
                            ? "w-6 bg-accent"
                            : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Перейти к карточке ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Нижний блок: Итоговая конфигурация - занимает ~42% высоты */}
                <Card className="flex-1 p-3 bg-card border-border/40 overflow-hidden flex flex-col">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Ваша конфигурация
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-1.5 text-sm mb-2">
                    {config.blades.length > 0 ? (
                      config.blades.map((bladeId) => {
                        const blade = bladeOptions.find(
                          (b) => b.id === bladeId,
                        );
                        return blade ? (
                          <div
                            key={bladeId}
                            className="flex justify-between items-center"
                          >
                            <span className="text-foreground">
                              {blade.name}
                            </span>
                            <span className="text-muted-foreground">
                              {blade.price.toLocaleString("ru-RU")} ₽
                            </span>
                          </div>
                        ) : null;
                      })
                    ) : (
                      <div className="text-muted-foreground/60">
                        Клинок не выбран
                      </div>
                    )}

                    {config.finish && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">
                          {
                            finishOptions.find((f) => f.id === config.finish)
                              ?.name
                          }
                        </span>
                        <span className="text-muted-foreground">
                          {finishOptions
                            .find((f) => f.id === config.finish)
                            ?.price.toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </div>
                    )}

                    {config.body !== "none" && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">
                          {bodyOptions.find((b) => b.id === config.body)?.name}
                        </span>
                        <span className="text-muted-foreground">
                          {bodyOptions
                            .find((b) => b.id === config.body)
                            ?.price.toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </div>
                    )}

                    {config.sheath !== "none" && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">
                          {
                            sheathOptions.find((s) => s.id === config.sheath)
                              ?.name
                          }
                        </span>
                        <span className="text-muted-foreground">
                          {sheathOptions
                            .find((s) => s.id === config.sheath)
                            ?.price.toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </div>
                    )}

                    {config.springs && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Пружины</span>
                        <span className="text-muted-foreground">800 ₽</span>
                      </div>
                    )}

                    {config.toolkit && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Инструменты</span>
                        <span className="text-muted-foreground">1,200 ₽</span>
                      </div>
                    )}

                    {config.oilcan && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Масленка</span>
                        <span className="text-muted-foreground">450 ₽</span>
                      </div>
                    )}

                    {config.packaging && (
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">
                          {
                            packagingOptions.find(
                              (p) => p.id === config.packaging,
                            )?.name
                          }
                        </span>
                        <span className="text-muted-foreground">
                          {packagingOptions
                            .find((p) => p.id === config.packaging)
                            ?.price.toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 space-y-2">
                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Итого:</span>
                      <span className="text-lg font-bold text-primary">
                        {calculateTotal().toLocaleString("ru-RU")} ₽
                      </span>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold"
                      disabled={config.blades.length === 0}
                    >
                      <Icon name="Rocket" size={16} className="mr-2" />
                      Запустить в изготовление
                    </Button>

                    {config.blades.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center">
                        Выберите хотя бы один клинок
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden flex flex-col gap-2 pb-4">
              {/* Фото ножа - верхняя часть */}
              <Card className="p-0 overflow-hidden bg-card border-border/40 h-[40vh] flex-shrink-0">
                <div className="relative h-full bg-gradient-to-br from-muted/50 to-background">
                  <img
                    key={imageKey}
                    src={currentImage}
                    alt="Комплект ножа"
                    className="w-full h-full object-cover animate-fade-in"
                  />

                  {/* Иконка информации */}
                  <button
                    onClick={() => setInfoOpen(!infoOpen)}
                    className="absolute top-3 left-3 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all z-20"
                    aria-label="Информация о конфигурации"
                  >
                    <Icon name="Info" size={18} className="text-foreground" />
                  </button>

                  {/* Информационное окно */}
                  {infoOpen && getCurrentSpecs().length > 0 && (
                    <div className="absolute top-3 left-3 w-[85%] max-h-[70%] bg-background/95 backdrop-blur-md rounded-xl shadow-2xl border border-border/40 flex flex-col z-30">
                      <div className="flex items-center justify-between p-2.5 border-b border-border/40 flex-shrink-0">
                        <h3 className="font-semibold text-xs">
                          Характеристики
                        </h3>
                        <button
                          onClick={() => setInfoOpen(false)}
                          className="hover:bg-muted/50 rounded-full p-1 transition-colors"
                          aria-label="Закрыть"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                      <div className="overflow-y-auto flex-1 p-2.5 space-y-2.5">
                        {getCurrentSpecs().map((spec, index) => (
                          <div key={index} className="space-y-1">
                            <h4 className="font-semibold text-xs text-accent">
                              {spec.title}
                            </h4>
                            <ul className="space-y-0.5">
                              {spec.specs.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-[11px] text-muted-foreground flex items-start gap-1.5"
                                >
                                  <Icon
                                    name="Check"
                                    size={12}
                                    className="text-accent mt-0.5 flex-shrink-0"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-3">
                    <p className="text-xs text-muted-foreground">
                      {config.blades.length > 0
                        ? `${config.blades.length} клинков • ${finishOptions.find((f) => f.id === config.finish)?.name}`
                        : "Выберите клинки"}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold">Итого:</span>
                      <span className="text-lg font-bold text-accent">
                        {calculateTotal().toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Заголовок с навигацией и точками */}
              <div className="flex items-center justify-center gap-3 py-2 flex-shrink-0">
                <button
                  onClick={() => {
                    const container = document.querySelector(
                      ".mobile-config-scroll",
                    );
                    if (container && mobileActiveCard > 0) {
                      const cardWidth =
                        container.querySelector(".snap-center")?.clientWidth ||
                        300;
                      const gap = 12;
                      container.scrollTo({
                        left: (cardWidth + gap) * (mobileActiveCard - 1),
                        behavior: "smooth",
                      });
                    }
                  }}
                  disabled={mobileActiveCard === 0}
                  className="p-2 rounded-full bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>

                <div className="flex flex-col items-center gap-2 flex-1">
                  <h3 className="text-base font-semibold text-center">
                    {
                      [
                        "Корпус",
                        "Механизм",
                        "Клинки",
                        "Обработка",
                        "Ножны",
                        "Дополнительно",
                        "Упаковка",
                        "Подарок",
                      ][mobileActiveCard]
                    }
                  </h3>

                  {/* Индикатор этапов (точки) */}
                  <div className="flex justify-center gap-2">
                    {[
                      "Корпус",
                      "Механизм",
                      "Клинки",
                      "Обработка",
                      "Ножны",
                      "Дополнительно",
                      "Упаковка",
                      "Подарок",
                    ].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const container = document.querySelector(
                            ".mobile-config-scroll",
                          );
                          if (container) {
                            const cardWidth =
                              container.querySelector(".snap-center")
                                ?.clientWidth || 300;
                            const gap = 12;
                            container.scrollTo({
                              left: (cardWidth + gap) * index,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`h-2 rounded-full transition-all ${
                          mobileActiveCard === index
                            ? "w-6 bg-accent"
                            : "w-2 bg-muted-foreground/30"
                        }`}
                        aria-label={`Перейти к этапу ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const container = document.querySelector(
                      ".mobile-config-scroll",
                    );
                    if (container && mobileActiveCard < 7) {
                      const cardWidth =
                        container.querySelector(".snap-center")?.clientWidth ||
                        300;
                      const gap = 12;
                      container.scrollTo({
                        left: (cardWidth + gap) * (mobileActiveCard + 1),
                        behavior: "smooth",
                      });
                    }
                  }}
                  disabled={mobileActiveCard === 7}
                  className="p-2 rounded-full bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>

              {/* Горизонтальная прокрутка конфигураций */}
              <div className="flex-shrink-0">
                <div
                  className="mobile-config-scroll flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
                  onScroll={(e) => {
                    const scrollLeft = e.currentTarget.scrollLeft;
                    const cardWidth =
                      e.currentTarget.querySelector(".snap-center")
                        ?.clientWidth || 300;
                    const gap = 12;
                    const newActiveCard = Math.round(
                      scrollLeft / (cardWidth + gap),
                    );
                    setMobileActiveCard(newActiveCard);
                  }}
                >
                  {/* Карточка: Корпус */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <RadioGroup
                      value={config.body}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, body: value }))
                      }
                    >
                      <div className="space-y-1.5 overflow-y-auto h-full p-3">
                        {bodyOptions.map((body) => (
                          <div
                            key={body.id}
                            className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                              config.body === body.id
                                ? "border-accent bg-accent/10"
                                : "border-border/40"
                            }`}
                            onClick={() =>
                              setConfig((prev) => ({ ...prev, body: body.id }))
                            }
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value={body.id}
                                id={`mobile-body-${body.id}`}
                              />
                              <Label
                                htmlFor={`mobile-body-${body.id}`}
                                className="flex-1 cursor-pointer font-medium text-sm"
                              >
                                {body.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {body.price === 0
                                  ? "Бесплатно"
                                  : `+${body.price.toLocaleString()} ₽`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Механизм */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <RadioGroup
                      value={config.mechanism}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, mechanism: value }))
                      }
                    >
                      <div className="space-y-1.5 overflow-y-auto h-full p-3">
                        {mechanismOptions.map((mech) => (
                          <div
                            key={mech.id}
                            className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                              config.mechanism === mech.id
                                ? "border-accent bg-accent/10"
                                : "border-border/40"
                            }`}
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                mechanism: mech.id,
                              }))
                            }
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value={mech.id}
                                id={`mobile-mech-${mech.id}`}
                              />
                              <Label
                                htmlFor={`mobile-mech-${mech.id}`}
                                className="flex-1 cursor-pointer font-medium text-sm"
                              >
                                {mech.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {mech.price === 0
                                  ? "Бесплатно"
                                  : `+${mech.price.toLocaleString()} ₽`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Клинки */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <div className="space-y-1.5 overflow-y-auto h-full p-3">
                      {bladeOptions.map((blade) => (
                        <div
                          key={blade.id}
                          onClick={() => toggleBlade(blade.id)}
                          className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                            config.blades.includes(blade.id)
                              ? "border-accent bg-accent/10"
                              : "border-border/40"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={config.blades.includes(blade.id)}
                            />
                            <p className="font-medium text-sm flex-1">
                              {blade.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {blade.price.toLocaleString()} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Карточка: Обработка */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <RadioGroup
                      value={config.finish}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, finish: value }))
                      }
                    >
                      <div className="space-y-1.5 overflow-y-auto h-full p-3">
                        {finishOptions.map((finish) => (
                          <div
                            key={finish.id}
                            className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                              config.finish === finish.id
                                ? "border-accent bg-accent/10"
                                : "border-border/40"
                            }`}
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                finish: finish.id,
                              }))
                            }
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value={finish.id}
                                id={`mobile-finish-${finish.id}`}
                              />
                              <Label
                                htmlFor={`mobile-finish-${finish.id}`}
                                className="flex-1 cursor-pointer font-medium text-sm"
                              >
                                {finish.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {finish.price === 0
                                  ? "Бесплатно"
                                  : `+${finish.price.toLocaleString()} ₽`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Ножны */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <RadioGroup
                      value={config.sheath}
                      onValueChange={(value) =>
                        setConfig((prev) => ({ ...prev, sheath: value }))
                      }
                    >
                      <div className="space-y-1.5 overflow-y-auto h-full p-3">
                        {sheathOptions.map((sheath) => (
                          <div
                            key={sheath.id}
                            className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                              config.sheath === sheath.id
                                ? "border-accent bg-accent/10"
                                : "border-border/40"
                            }`}
                            onClick={() =>
                              setConfig((prev) => ({
                                ...prev,
                                sheath: sheath.id,
                              }))
                            }
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value={sheath.id}
                                id={`mobile-sheath-${sheath.id}`}
                              />
                              <Label
                                htmlFor={`mobile-sheath-${sheath.id}`}
                                className="flex-1 cursor-pointer font-medium text-sm"
                              >
                                {sheath.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {sheath.price === 0
                                  ? "Бесплатно"
                                  : `+${sheath.price.toLocaleString()} ₽`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </Card>

                  {/* Карточка: Дополнительно */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <div className="space-y-1.5 overflow-y-auto h-full p-3">
                      <div
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            springs: !prev.springs,
                          }))
                        }
                        className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                          config.springs
                            ? "border-accent bg-accent/10"
                            : "border-border/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.springs} />
                          <p className="font-medium text-sm flex-1">
                            Запасные пружины
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +800 ₽
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            toolkit: !prev.toolkit,
                          }))
                        }
                        className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                          config.toolkit
                            ? "border-accent bg-accent/10"
                            : "border-border/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.toolkit} />
                          <p className="font-medium text-sm flex-1">
                            Набор отвёрток
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +1 200 ₽
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            oilcan: !prev.oilcan,
                          }))
                        }
                        className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                          config.oilcan
                            ? "border-accent bg-accent/10"
                            : "border-border/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={config.oilcan} />
                          <p className="font-medium text-sm flex-1">Масленка</p>
                          <p className="text-sm text-muted-foreground">
                            +450 ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Карточка: Упаковка и заказ */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-hidden">
                    <div className="overflow-y-auto h-full p-3 flex flex-col">
                      <RadioGroup
                        value={config.packaging}
                        onValueChange={(value) =>
                          setConfig((prev) => ({ ...prev, packaging: value }))
                        }
                      >
                        <div className="space-y-1.5 mb-4">
                          {packagingOptions.map((pkg) => (
                            <div
                              key={pkg.id}
                              className={`p-2.5 rounded-lg border-2 cursor-pointer ${
                                config.packaging === pkg.id
                                  ? "border-accent bg-accent/10"
                                  : "border-border/40"
                              }`}
                              onClick={() =>
                                setConfig((prev) => ({
                                  ...prev,
                                  packaging: pkg.id,
                                }))
                              }
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem
                                  value={pkg.id}
                                  id={`mobile-pkg-${pkg.id}`}
                                />
                                <Label
                                  htmlFor={`mobile-pkg-${pkg.id}`}
                                  className="flex-1 cursor-pointer font-medium text-sm"
                                >
                                  {pkg.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {pkg.price === 0
                                    ? "Бесплатно"
                                    : `+${pkg.price.toLocaleString()} ₽`}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </Card>

                  {/* Карточка: Подарок */}
                  <Card className="min-w-[85vw] snap-center bg-card border-border/40 flex flex-col h-[45vh] overflow-y-auto p-3 pb-4">
                    <h3 className="text-base font-semibold mb-2 flex-shrink-0">
                      Ваш подарок при заказе сегодня
                    </h3>
                    <div className="flex-1 flex items-center justify-center min-h-0">
                      <div
                        onClick={() =>
                          setConfig((prev) => ({ ...prev, gift: !prev.gift }))
                        }
                        className={`rounded-lg p-3 border-2 w-full cursor-pointer transition-all ${
                          config.gift
                            ? "bg-accent/10 border-accent"
                            : "bg-accent/5 border-accent/20"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <Checkbox
                              checked={config.gift}
                              onCheckedChange={(checked) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  gift: checked as boolean,
                                }))
                              }
                            />
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                Финский клинок
                              </p>
                              <p className="text-xs text-muted-foreground line-through mt-0.5">
                                4 200 ₽
                              </p>
                              <p className="text-lg font-bold text-accent mt-0.5">
                                Бесплатно
                              </p>
                            </div>
                          </div>
                          <Icon
                            name="Gift"
                            size={32}
                            className="text-accent opacity-20 flex-shrink-0"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-border/40 my-2 flex-shrink-0" />

                    <div className="flex-shrink-0">
                      <Button
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4"
                        disabled={config.blades.length === 0}
                      >
                        Оформить заказ
                      </Button>

                      {config.blades.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center mt-1">
                          Выберите хотя бы один клинок
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "gallery" && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Галерея работ</h2>
              <p className="text-muted-foreground text-lg">
                Изделия ручной работы от мастеров Assasin's Blade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {galleryItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-border/40 hover:border-accent/50 transition-all"
                >
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

        {activeSection === "about" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">О бренде Assasin's Blade</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Assasin's Blade — это мастерская по созданию уникальных
                  выкидных ножей ручной работы. Мы специализируемся на
                  производстве кастомизируемых ножей высочайшего качества.
                </p>
                <p>
                  Каждый нож создается с использованием современных технологий и
                  традиционных методов кузнечного мастерства. Мы используем
                  только лучшие материалы: высокоуглеродистую сталь для клинков
                  и натуральные материалы для рукоятей.
                </p>
                <p>
                  Наша философия — создание не просто инструмента, а
                  произведения искусства, которое прослужит владельцу долгие
                  годы и станет надежным спутником в любых условиях.
                </p>
              </div>
            </div>

            <Separator className="bg-border/40" />

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-accent">8+</div>
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
