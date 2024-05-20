import { prisma } from "./gqlServer";

export default async function seed() {
    await prisma.products.createMany({
        data: [
            {
                itemName: "Eddie Palmore white Adidas shoes",
                authorLink: "https://unsplash.com/@eddiepalmore?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Eddie Palmore",
                imageCredit: "https://unsplash.com/photos/black-and-white-adidas-sneakers-XwWGyrVidZE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/eddie-palmore-XwWGyrVidZE-unsplash.jpg",
                description: "Experience style and comfort with these black Adidas sneakers. Featuring the classic three-stripe design, these shoes are a perfect blend of durability and timeless appeal.",
                price: 25,
                category_level0: "Shoes",
                category_level1: "Adidas",
                category_level2: "White"
            },
            {
                itemName: "Black adidas sports shoe",
                authorLink: "https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Chuttersnap",
                imageCredit: "https://unsplash.com/photos/shallow-focus-photography-of-unpaired-gray-adidas-sports-shoe-zMaQFh-0ajA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/chuttersnap-zMaQFh-0ajA-unsplash.jpg",
                description: "Modern, stylish sneaker featuring a dark blue color with black overlays. It’s equipped with multiple straps for secure fitting and is highlighted by green and white accents on the sole. A sleek and fashionable choice for any wardrobe.",
                price: 35,
                category_level0: "Shoes",
                category_level1: "Adidas",
                category_level2: "Black"
            },
            {
                itemName: "Female white Adidas long sleeve shirt",
                authorLink: "https://unsplash.com/@laurachouette?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Laura Chouette",
                imageCredit: "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-wearing-black-sunglasses-SQrZ_lGJXCo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/laura-chouette-SQrZ_lGJXCo-unsplash.jpg",
                description: "White Adidas hoodie with black stripes running down both sleeves. The Adidas logo, consisting of three black leaves and the brand name, is prominently displayed on the left side of the chest area.",
                price: 25,
                category_level0: "Shirt",
                category_level1: "Adidas",
                category_level2: "White"
            },
            {
                itemName: "Red Adidas shoe",
                authorLink: "https://unsplash.com/@grailify?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Grailify",
                imageCredit: "https://unsplash.com/photos/red-and-blue-nike-athletic-shoe-ju4-jsQ8jmk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/grailify-ju4-jsQ8jmk-unsplash.jpg",
                description: "The shoe is a vibrant orange and blue sneaker. It features a bright orange upper with textured patterns, giving it a modern and stylish look. The midsole is adorned with an intricate blue texture, contrasting beautifully with the orange upper.",
                price: 50,
                category_level0: "Shoes",
                category_level1: "Adidas",
                category_level2: "Red"
            },
            {
                itemName: "Nike green shoe",
                authorLink: "https://unsplash.com/@usama_1248?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "USAMA AKRAM",
                imageCredit: "https://unsplash.com/photos/green-and-black-nike-athletic-shoe-kP6knT7tjn4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/usama-akram-kP6knT7tjn4-unsplash.jpg",
                description: "The shoe is a vibrant neon green sneaker with a sleek design. It features a black Nike swoosh on the side, adding a touch of brand recognition. The white soles are accented with black and green details, creating a dynamic contrast. Additionally, the word 'ZoomX' is imprinted on the sole, emphasizing its advanced technology.",
                price: 75,
                category_level0: "Shoes",
                category_level1: "Nike",
                category_level2: "Green"
            },
            {
                itemName: "Adidas grey Deerupt",
                authorLink: "https://unsplash.com/@martinkatler?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Martin Katler",
                imageCredit: "https://unsplash.com/photos/pair-of-gray-running-shoes-Y4fKN-RlMV4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/martin-katler-Y4fKN-RlMV4-unsplash.jpg",
                description: "The shoe is grey with a patterned design, featuring multiple small, diamond-shaped textures across its surface. It has a streamlined shape and appears lightweight. The inner part of the shoe is visible, showing a green interior.",
                price: 25.75,
                category_level0: "Shoes",
                category_level1: "Adidas",
                category_level2: "Grey"
            },
            {
                itemName: "White orange football",
                authorLink: "https://unsplash.com/@rcbtones?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Julien Rocheblave",
                imageCredit: "https://unsplash.com/photos/red-and-orange-soccer-ball-on-green-grass-field-F3M8FmvWQo4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/julien-rocheblave-F3M8FmvWQo4-unsplash.jpg",
                description: "The soccer ball is white with intricate designs in black, orange, and yellow colors. It features text and logos imprinted on its surface, including the brand name 'uhlsport' written in lowercase letters and a logo next to it.",
                price: 15,
                category_level0: "Football",
                category_level1: "Ball",
                category_level2: "White"
            },
            {
                itemName: "Tennis ball",
                authorLink: "https://unsplash.com/@benhershey?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Ben Hershey",
                imageCredit: "https://unsplash.com/photos/shallow-focus-photography-of-tennis-ball-VEW78A1YZ6I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/ben-hershey-VEW78A1YZ6I-unsplash.jpg",
                description: "The tennis ball is bright yellow-green, showcasing its fuzzy texture that is typical of standard tennis balls. It has a prominent white curved line marking that divides it into two halves.",
                price: 1,
                category_level0: "Tennis",
                category_level1: "Ball"
            },
            {
                itemName: "Nike FCBarcelona football",
                authorLink: "https://unsplash.com/@bella_lac?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "bella lac",
                imageCredit: "https://unsplash.com/photos/blue-maroon-and-yellow-nike-soccer-ball-LTyPTQ2tgNA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/bella-lac-LTyPTQ2tgNA-unsplash.jpg",
                description: "The ball showcases a mix of dark green and navy blue panels, highlighted by bright yellow streaks for a striking contrast. The term 'BARCA' is visibly emblazoned on a dark green panel, denoting its link to FC Barcelona.",
                price: 1
            },
            {
                itemName: "Adidas all court basketball",
                authorLink: "https://unsplash.com/@anthonytedja",
                authorName: "Anthony Tedja",
                imageCredit: "https://unsplash.com/photos/person-tossing-basketball-2wqXZvKJkEQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/anthony-tedja-2wqXZvKJkEQ-unsplash.jpg",
                description: "The Adidas All-Court basketball is a standard-sized basketball used for playing basketball games and practicing skills. It features a pebbled texture for grip and control during dribbling and shooting. The prominent Adidas logo on its surface indicates its brand.",
                price: 1
            },
            {
                itemName: "Spalding basketball",
                authorLink: "https://unsplash.com/@manufactured?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Manuel Will",
                imageCredit: "https://unsplash.com/photos/brown-basketball-on-white-concrete-surface-xOlYxzqfbnU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/manuel-will-cUkKHPvHIjI-unsplash.jpg",
                description: "This basketball is designed for durability and performance. The ball is primarily light brown with a textured surface for optimal grip. The Spalding logo is prominently displayed, indicating the brand's reputation for quality sports equipment.",
                price: 1
            },
            {
                itemName: "Table tennis equipments",
                authorLink: "https://unsplash.com/@kommumikation?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Mika Baumeister",
                imageCredit: "https://unsplash.com/photos/red-and-yellow-wooden-table-tennis-racket-KP8lBWT6CaQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/mika-baumeister-KP8lBWT6CaQ-unsplash.jpg",
                description: "A well-used table tennis paddle with a red rubber surface showing signs of wear. The brand 'andro' is labeled on the edge, while the handle bears stamps of 'GEWO' and 'ALL+ RAVE.' Next to it is a white table tennis ball also branded with 'GEWO.'",
                price: 5
            },
            {
                itemName: "Bayern Munich red football",
                authorLink: "https://unsplash.com/@kawshar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Kawshar Ahmed",
                imageCredit: "https://unsplash.com/photos/red-soccer-ball-on-white-table-ETO4Estt2q0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/kawshar-ahmed-ETO4Estt2q0-unsplash.jpg",
                description: "A vivid red soccer ball prominently displays the Bayern Munich logo and stars, boasting geometric patterns for visual contrast. The logo and four stars add an air of authenticity and prestige to the design.",
                price: 1
            },
            {
                itemName: "Yellow green football",
                authorLink: "https://unsplash.com/@ianhigbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Ian Higbee",
                imageCredit: "https://unsplash.com/photos/white-and-green-soccer-ball-on-green-grass-C64fclQF3Cc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/ian-higbee-C64fclQF3Cc-unsplash.jpg",
                description: "A vibrant yellow and black soccer ball resting on the grass, capturing the essence of outdoor sports and activities.",
                price: 1
            },
            {
                itemName: "White ice skates",
                authorLink: "https://unsplash.com/@zoefotografeert?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Zoë Warmerdam",
                imageCredit: "https://unsplash.com/photos/white-nike-air-force-1-high-UC6ARRpzk6s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/zoe-warmerdam-UC6ARRpzk6s-unsplash.jpg",
                description: "A pair of elegant white ice skates with intricate design details, reflecting the combination of functionality and style in sportswear. These ice skates are specifically designed for gliding gracefully on ice surfaces.",
                price: 2
            },
            {
                itemName: "Intruder black ice skates",
                authorLink: "https://unsplash.com/@mattyfours?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Matthew Fournier",
                imageCredit: "https://unsplash.com/photos/close-up-photo-of-black-and-gray-intruder-ice-skates-on-frozen-body-of-water-G971e4EFKtA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/matthew-fournier-G971e4EFKtA-unsplash.jpg",
                description: "The INTRUDER ice skates in the image are black and white, with the brand name 'INTRUDER' visible on their sides. They are laced up and have white blades attached to their soles, indicating that they are designed for ice skating. These skates combine functionality and style, making them suitable for both recreational skating and more serious ice sports.",
                price: 2
            },
            {
                itemName: "Adidas X-Layskin football boots",
                authorLink: "https://unsplash.com/@bradenh13?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                authorName: "Braden Hopkins",
                imageCredit: "https://unsplash.com/photos/white-and-pink-shoe-lace-gAb1IFCxP58?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/braden-hopkins-gAb1IFCxP58-unsplash.jpg",
                description: "The soccer shoes are predominantly white with a sleek design. Their soles are equipped with transparent, multi-colored studs for grip, and they emit an ethereal glow of pinks, yellows, and oranges. The upper part of the shoes features the Adidas logo and 'X GHOSTED' text imprinted on them. These dynamic and energetic shoes are perfect for the soccer field.",
                price: 2,
                category_level0: "Football",
                category_level1: "Boots",
                category_level2: "Adidas"
            },
            {
                itemName: "American Football 1",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/football1.jpg",
                description: "The textured surface and stitching of the football are prominently visible, capturing the essence of this popular sport.",
                price: 25
            },
            {
                itemName: "American Football on grass",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/AmericanFootballOnGrass2.jpg",
                description: "A football resting on the grass, illuminated by the warm, golden light of sunset. Shadows cast intricate patterns on the football’s textured surface. In the background, blurred figures are engaged in a game, their movements echoing the energy and passion associated with football.",
                price: 30
            },
            {
                itemName: "American Football on grass 2",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/AmericanFootballOnGrass.jpg",
                description: "The football has a classic design, featuring a rich brown color with intricate textures that highlight its quality and durability. It is adorned with white laces and stripes, enhancing its visual appeal.",
                price: 25.5
            },
            {
                itemName: "Hockey stick on ice",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/Hockeystick1.jpg",
                description: "The hockey stick has a modern design with the brand name 'BAUER' visible on its sleek black shaft. It’s laid on an icy surface, suggesting its use for ice hockey. The overall look exudes readiness for a thrilling game on the rink!",
                price: 30
            },
            {
                itemName: "Hockey stick and puck",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/HockeyStickbluebacgroundAndTuck.jpg",
                description: "The hockey stick features a sleek black design with golden stripes for a premium look. Its wide, flat blade enhances puck control, while the ergonomic handle ensures comfortable grip during play. The standard-sized black puck is durable, ready to endure powerful shots.",
                price: 75
            },
            {
                itemName: "Cool hockey stick",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/Hockeystickdarkbg.jpg.png",
                description: "The hockey stick boasts a slender, well-crafted shaft, likely crafted from light-colored wood with visible grain patterns. Engineered for precise control and power, the curvature of the shaft enhances gameplay. The blade features an elegant geometric pattern, balancing form and function seamlessly for accurate shooting and passing. Illuminated against a dark backdrop, its intricate details shine, embodying quality and precision for professional and recreational play alike.",
                price: 50
            },
            {
                itemName: "Wooden hockey stick",
                imageSrc: "https://klintstorage.blob.core.windows.net/klintstorage/Woodenhockeystick.jpg",
                description: "It has a long, slender wooden shaft with a curved blade at the bottom. The blade appears to be black, possibly covered with tape for grip and puck handling. Its design captures the essence of simplicity and elegance associated with the sport of hockey.",
                price: 20
            }

        ]
    })
}