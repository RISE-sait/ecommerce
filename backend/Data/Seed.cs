using System;
using System.Linq;
using backend.Data;
using backend.Models;

namespace backend.Data
{
    public static class DbSeeder
    {
        static readonly ProductRelatedWord shoesWord = new() { Word = "Shoes" };
        static readonly ProductRelatedWord adidasWord = new() { Word = "Adidas" };
        static readonly ProductRelatedWord whiteWord = new() { Word = "White" };
        static readonly ProductRelatedWord blackWord = new() { Word = "Black" };
        static readonly ProductRelatedWord shirtWord = new() { Word = "Shirt" };
        static readonly ProductRelatedWord redWord = new() { Word = "Red" };
        static readonly ProductRelatedWord greenWord = new() { Word = "Green" };
        static readonly ProductRelatedWord nikeWord = new() { Word = "Nike" };
        static readonly ProductRelatedWord greyWord = new() { Word = "Grey" };
        static readonly ProductRelatedWord footballWord = new() { Word = "Football" };
        static readonly ProductRelatedWord tennisWord = new() { Word = "Tennis" };
        static readonly ProductRelatedWord basketballWord = new() { Word = "Basketball" };
        static readonly ProductRelatedWord tableTennisWord = new() { Word = "Table tennis" };
        static readonly ProductRelatedWord bayernMunichWord = new() { Word = "Bayern Munich" };
        static readonly ProductRelatedWord yellowWord = new() { Word = "Yellow" };
        static readonly ProductRelatedWord skatesWord = new() { Word = "Skates" };
        static readonly ProductRelatedWord iceWord = new() { Word = "Ice" };
        static readonly ProductRelatedWord intruderWord = new() { Word = "Intruder" };
        static readonly ProductRelatedWord bootsWord = new() { Word = "Boots" };
        static readonly ProductRelatedWord americanWord = new() { Word = "American" };
        static readonly ProductRelatedWord hockeyWord = new() { Word = "Hockey" };
        static readonly ProductRelatedWord stickWord = new() { Word = "Stick" };
        static readonly ProductRelatedWord puckWord = new() { Word = "Puck" };
        static readonly ProductRelatedWord woodenWord = new() { Word = "Wooden" };
        static readonly ProductRelatedWord deeruptWord = new() { Word = "Deerupt" };
        static readonly ProductRelatedWord orangeWord = new() { Word = "Orange" };
        static readonly ProductRelatedWord ballWord = new() { Word = "Ball" };
        static readonly ProductRelatedWord fcBarcelonaWord = new() { Word = "FC Barcelona" };
        static readonly ProductRelatedWord spaldingWord = new() { Word = "Spalding" };
        static readonly List<ProductRelatedWord> relatedWords =
[
    shoesWord, adidasWord, whiteWord, blackWord, shirtWord,
    redWord, greenWord, nikeWord, greyWord, footballWord,
    tennisWord, basketballWord, tableTennisWord, bayernMunichWord,
    yellowWord, skatesWord, iceWord, intruderWord, bootsWord,
    americanWord, hockeyWord, stickWord, puckWord, woodenWord,
    deeruptWord, orangeWord, ballWord, fcBarcelonaWord, spaldingWord
];

        public static void Seed(DataContext context)
        {
            if (!context.ProductRelatedWords.Any())
            {
                context.ProductRelatedWords.AddRange(relatedWords);
            }
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product
                    {
                        ItemName = "Hockey stick on ice",
                        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321853817.sYK5OCDG2i319DJqTuhqH8cFiWi-rGurbbovTFnDJnY=.webp",
                        Description = "The hockey stick has a modern design with the brand name 'BAUER' visible on its sleek black shaft. It’s laid on an icy surface, suggesting its use for ice hockey. The overall look exudes readiness for a thrilling game on the rink!",
                        Price = 30,
                        ProductRelatedWords = [hockeyWord, stickWord, iceWord]

                    },
      new Product
      {
          ItemName = "Wooden hockey stick",
          ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321917040.uBW4osrRbWzTM7OP3vEaMNoevm+XLadj4ufZDi2s-MM=.webp",
          Description = "It has a long, slender wooden shaft with a curved blade at the bottom. The blade appears to be black, possibly covered with tape for grip and puck handling. Its design captures the essence of simplicity and elegance associated with the sport of hockey.",
          Price = 20,
          ProductRelatedWords = [hockeyWord, stickWord, woodenWord]
      },
       new Product
       {
           ItemName = "Intruder black ice skates",
           AuthorLink = "https://unsplash.com/@mattyfours?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
           AuthorName = "Matthew Fournier",
           ImageCredit = "https://unsplash.com/photos/close-up-photo-of-black-and-gray-intruder-ice-skates-on-frozen-body-of-water-G971e4EFKtA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
           ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322877875.86WCcTWHva-VJkRPvHaP5LTLhWsmeFNuBer1EKcvtaE=.webp",
           Description = "The INTRUDER ice skates in the image are black and white, with the brand name 'INTRUDER' visible on their sides. They are laced up and have white blades attached to their soles, indicating that they are designed for ice skating. These skates combine functionality and style, making them suitable for both recreational skating and more serious ice sports.",
           Price = 2,
           ProductRelatedWords = [intruderWord, iceWord, skatesWord, blackWord]

       },
     new Product
     {
         ItemName = "Spalding basketball",
         AuthorLink = "https://unsplash.com/@manufactured?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         AuthorName = "Manuel Will",
         ImageCredit = "https://unsplash.com/photos/brown-basketball-on-white-concrete-surface-xOlYxzqfbnU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322879355.htB+zQQUj7neFKh7KW6Tsv3KX7x7OLMmT8Cn4ab-NE0=.webp",
         Description = "This basketball is designed for durability and performance. The ball is primarily light brown with a textured surface for optimal grip. The Spalding logo is prominently displayed, indicating the brand's reputation for quality sports equipment.",
         Price = 1,
         ProductRelatedWords = [basketballWord, spaldingWord]

     }, new Product
     {
         ItemName = "Nike green shoe",
         AuthorLink = "https://unsplash.com/@usama_1248?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         AuthorName = "USAMA AKRAM",
         ImageCredit = "https://unsplash.com/photos/green-and-black-nike-athletic-shoe-kP6knT7tjn4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323480200.6T7QQ5Th9k9hSaVA+QV3cAUPIoYPQzCERiDPT0dUCyo=.webp",
         Description = "The shoe is a vibrant neon green sneaker with a sleek design. It features a black Nike swoosh on the side, adding a touch of brand recognition. The white soles are accented with black and green details, creating a dynamic contrast. Additionally, the word 'ZoomX' is imprinted on the sole, emphasizing its advanced technology.",
         Price = 75,
         ProductRelatedWords = [nikeWord, greenWord, shoesWord]

     },
                     new Product
                     {
                         ItemName = "Adidas all court basketball",
                         AuthorLink = "https://unsplash.com/@anthonytedja",
                         AuthorName = "Anthony Tedja",
                         ImageCredit = "https://unsplash.com/photos/person-tossing-basketball-2wqXZvKJkEQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323480261.oeDJlBbZIRqNF+eL8fSOXgL1qVJahTvDRWyNt9UG8bM=.webp",
                         Description = "The Adidas All-Court basketball is a standard-sized basketball used for playing basketball games and practicing skills. It features a pebbled texture for grip and control during dribbling and shooting. The prominent Adidas logo on its surface indicates its brand.",
                         Price = 1,
                         ProductRelatedWords = [adidasWord, basketballWord]

                     }, new Product
                     {
                         ItemName = "White orange football",
                         AuthorLink = "https://unsplash.com/@rcbtones?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         AuthorName = "Julien Rocheblave",
                         ImageCredit = "https://unsplash.com/photos/red-and-orange-soccer-ball-on-green-grass-field-F3M8FmvWQo4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323480481.KyjNYGqBL1XbhPtnyr8pVSGme5iEw0tin35xp5cUjmY=.webp",
                         Description = "The soccer ball is white with intricate designs in black, orange, and yellow colors. It features text and logos imprinted on its surface, including the brand name 'uhlsport' written in a modern font. The ball has a glossy finish, enhancing its visual appeal.",
                         Price = 55,
                         ProductRelatedWords = [whiteWord, orangeWord, footballWord]
                     }, new Product
                     {
                         ItemName = "Tennis ball",
                         AuthorLink = "https://unsplash.com/@benhershey?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         AuthorName = "Ben Hershey",
                         ImageCredit = "https://unsplash.com/photos/shallow-focus-photography-of-tennis-ball-VEW78A1YZ6I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323480877.Cv-MU9wJ0KZ8WlJ9WLo3OB1Vg3dKLQJRT7De7lB-UQw=.webp",
                         Description = "The tennis ball is bright yellow-green, showcasing its fuzzy texture that is typical of standard tennis balls. It has a prominent white curved line marking that divides it into two halves.",
                         Price = 1,
                         ProductRelatedWords = [tennisWord, ballWord]

                     }, new Product
                     {
                         ItemName = "Nike FCBarcelona football",
                         AuthorLink = "https://unsplash.com/@bella_lac?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         AuthorName = "bella lac",
                         ImageCredit = "https://unsplash.com/photos/blue-maroon-and-yellow-nike-soccer-ball-LTyPTQ2tgNA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323480921.F2mZTtqCQ76+HxOI4uK301q-cXwBPmcF9RFfCypQXDA=.webp",
                         Description = "The ball showcases a mix of dark green and navy blue panels, highlighted by bright yellow streaks for a striking contrast. The term 'BARCA' is visibly emblazoned on a dark green panel, denoting its link to FC Barcelona.",
                         Price = 1,
                         ProductRelatedWords = [nikeWord, footballWord, fcBarcelonaWord]

                     },
                    new Product
                    {
                        ItemName = "Black adidas sports shoe",
                        AuthorLink = "https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        AuthorName = "Chuttersnap",
                        ImageCredit = "https://unsplash.com/photos/shallow-focus-photography-of-unpaired-gray-adidas-sports-shoe-zMaQFh-0ajA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323481012.QjPZxTc-LYal4HF9k5423hMDL2eBgZ10teW0ICjwnvw=.webp",
                        Description = "Modern, stylish sneaker featuring a dark blue color with black overlays. Equipped with multiple straps for secure fitting and is highlighted by green and white accents on the sole. A sleek and fashionable choice for any wardrobe.",
                        Price = 35,
                        ProductRelatedWords = [shoesWord, adidasWord, blackWord]

                    }, new Product
                    {
                        ItemName = "Female white Adidas long sleeve shirt",
                        AuthorLink = "https://unsplash.com/@laurachouette?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        AuthorName = "Laura Chouette",
                        ImageCredit = "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-wearing-black-sunglasses-SQrZ_lGJXCo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323481316.LA3DAxGk371474NImR7pZqA33YhCSfDySmCpX4d1bYk=.webp",
                        Description = "White Adidas hoodie with black stripes running down both sleeves. The Adidas logo, consisting of three black leaves and the brand name, is prominently displayed on the left side of the chest area.",
                        Price = 25,
                        ProductRelatedWords = [shirtWord, adidasWord, whiteWord]
                    },
                   new Product
                   {
                       ItemName = "Red Adidas shoe",
                       AuthorLink = "https://unsplash.com/@grailify?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                       AuthorName = "Grailify",
                       ImageCredit = "https://unsplash.com/photos/red-and-blue-nike-athletic-shoe-ju4-jsQ8jmk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                       ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323481642.Gm4wv7juZqj97UI8KE9y6ZGrl8ydMBzW3AupwfXNEVw=.webp",
                       Description = "The shoe is a vibrant orange and blue sneaker. It features a bright orange upper with textured patterns, giving it a modern and stylish look. The midsole is adorned with an intricate blue texture, contrasting beautifully with the orange upper.",
                       Price = 50,
                       ProductRelatedWords = [redWord, adidasWord, shoesWord]

                   },
                    new Product
                    {
                        ItemName = "Eddie Palmore white Adidas shoes",
                        AuthorLink = "https://unsplash.com/@eddiepalmore?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        AuthorName = "Eddie Palmore",
                        ImageCredit = "https://unsplash.com/photos/black-and-white-adidas-sneakers-XwWGyrVidZE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323481871.bZzh9IknzEC3izpHHgcSuxYwdGNgJClszNJ0IVhsFMA=.webp",
                        Description = "Experience style and comfort with these black Adidas sneakers. Featuring the classic three-stripe design, these shoes are a perfect blend of durability and timeless appeal.",
                        Price = 25,
                        ProductRelatedWords = [shoesWord, adidasWord, whiteWord]
                    },
                    new Product
                    {
                        ItemName = "Adidas grey Deerupt",
                        AuthorLink = "https://unsplash.com/@martinkatler?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        AuthorName = "Martin Katler",
                        ImageCredit = "https://unsplash.com/photos/pair-of-gray-running-shoes-Y4fKN-RlMV4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718323481931.Dy2Ukz3-Q1dXUfwgT+QbSx+JiTaGdBCjRmmBnhGg+bo=.webp",
                        Description = "The shoe is grey with a patterned design, featuring multiple small, diamond-shaped textures across its surface. It has a streamlined shape and appears lightweight. The inner part of the shoe is visible, showing a green interior.",
                        Price = 25.75,
                        ProductRelatedWords = [deeruptWord, adidasWord, greyWord]
                    },

      new Product
      {
          ItemName = "Bayern Munich red football",
          AuthorLink = "https://unsplash.com/@kawshar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          AuthorName = "Kawshar Ahmed",
          ImageCredit = "https://unsplash.com/photos/red-soccer-ball-on-white-table-ETO4Estt2q0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322878548.1zKbIRuWWcgWBoqxDxwCUgLkgQgXWHBC54M49q3j3oo=.webp",
          Description = "A vivid red soccer ball prominently displays the Bayern Munich logo and stars, boasting geometric patterns for visual contrast. The logo and four stars add an air of authenticity and prestige to the design.",
          Price = 1,
          ProductRelatedWords = [redWord, footballWord, bayernMunichWord]

      },
new Product
{
    ItemName = "Yellow green football",
    AuthorLink = "https://unsplash.com/@ianhigbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    AuthorName = "Ian Higbee",
    ImageCredit = "https://unsplash.com/photos/white-and-green-soccer-ball-on-green-grass-C64fclQF3Cc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322878274.HFKmDv1P3jEIwm1-5MsGNpCmyp4bYDePdwblqQoMIkg=.webp",
    Description = "A vibrant yellow and black soccer ball resting on the grass, capturing the essence of outdoor sports and activities.",
    Price = 1,
    ProductRelatedWords = [greenWord, footballWord, yellowWord]

},
      new Product
      {
          ItemName = "Cool hockey stick",
          ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321922280.k-N1nvpuWBnDeDyLduCwiabNmZcMToKjjBrbyTGjI3M=.webp",
          Description = "The hockey stick boasts a slender, well-crafted shaft, likely crafted from light-colored wood with visible grain patterns. Engineered for precise control and power, the curvature of the shaft enhances gameplay. The blade features an elegant geometric pattern, balancing form and function seamlessly for accurate shooting and passing. Illuminated against a dark backdrop, its intricate details shine, embodying quality and precision for professional and recreational play alike.",
          Price = 50,
          ProductRelatedWords = [hockeyWord, stickWord]

      },
       new Product
       {
           ItemName = "White ice skates",
           AuthorLink = "https://unsplash.com/@zoefotografeert?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
           AuthorName = "Zoë Warmerdam",
           ImageCredit = "https://unsplash.com/photos/white-nike-air-force-1-high-UC6ARRpzk6s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
           ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322877691.xYBwNikAQEODdsliGBCXDHp4gh8Mh97xlujjz+YQ2Yk=.webp",
           Description = "A pair of elegant white ice skates with intricate design details, reflecting the combination of functionality and style in sportswear. These ice skates are specifically designed for gliding gracefully on ice surfaces.",
           Price = 2,
           ProductRelatedWords = [whiteWord, iceWord, skatesWord]

       },
      new Product
      {
          ItemName = "Hockey stick and puck",
          ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321921986.bpWHL3U+VDpi5Z9DpH+vQGhK473uFOuc02vqkzByX-g=.webp",
          Description = "The hockey stick features a sleek black design with golden stripes for a premium look. Its wide, flat blade enhances puck control, while the ergonomic handle ensures comfortable grip during play. The standard-sized black puck is durable, ready to endure powerful shots.",
          Price = 75,
          ProductRelatedWords = [hockeyWord, stickWord, puckWord]

      },
     new Product
     {
         ItemName = "Adidas X-Layskin football boots",
         AuthorLink = "https://unsplash.com/@bradenh13?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         AuthorName = "Braden Hopkins",
         ImageCredit = "https://unsplash.com/photos/white-and-pink-shoe-lace-gAb1IFCxP58?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322030137.54q5QAcieU-tdhdea-5IOh3DPZh0qKNqiwt7wGTSyMw=.webp",
         Description = "The soccer shoes are predominantly white with a sleek design. Their soles are equipped with transparent, multi-colored studs for grip, and they emit an ethereal glow of pinks, yellows, and oranges. The upper part of the shoes features the Adidas logo and 'X GHOSTED' text imprinted on them. These dynamic and energetic shoes are perfect for the soccer field.",
         Price = 2,
         ProductRelatedWords = [adidasWord, footballWord, bootsWord]

     },
 new Product
 {
     ItemName = "Table tennis equipments",
     AuthorLink = "https://unsplash.com/@kommumikation?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
     AuthorName = "Mika Baumeister",
     ImageCredit = "https://unsplash.com/photos/red-and-yellow-wooden-table-tennis-racket-KP8lBWT6CaQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
     ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718322877665.yaAWwc8aD0GGgPQc5-Xmc8WuLI9Few4F94QbkBbYOJE=.webp",
     Description = "A well-used table tennis paddle with a red rubber surface showing signs of wear. The brand 'andro' is labeled on the edge, while the handle bears stamps of 'GEWO' and 'ALL+ RAVE.' Next to it is a white table tennis ball also branded with 'GEWO.'",
     Price = 5,
     ProductRelatedWords = [tableTennisWord]

 },
    new Product
    {
        ItemName = "American Football 1",
        ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321928526.qn2BQ7utHJRff1Mx7Md1rfJf1p-5vFxx9wrnkiNeeHw=.webp",
        Description = "The textured surface and stitching of the football are prominently visible, capturing the essence of this popular sport.",
        Price = 25,
        ProductRelatedWords = [americanWord, footballWord]

    },
     new Product
     {
         ItemName = "American Football on grass",
         ImageSrc = "https://klintsstorage1.blob.core.windows.net/ksports/60.1718321917117.WXGzh2WwJp8ncKe4DGYHwYkCPnsQP8bmN9hivAELQRU=.webp",
         Description = "A football resting on the grass, illuminated by the warm, golden light of sunset. Shadows cast intricate patterns on the football’s textured surface. In the background, blurred figures are engaged in a game, their movements echoing the energy and passion associated with football.",
         Price = 30,
         ProductRelatedWords = [americanWord, footballWord]

     }
    );

                context.SaveChanges();
            }
        }
    }
}