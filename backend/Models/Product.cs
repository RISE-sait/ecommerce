namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string ItemName { get; set; }

        public string? AuthorLink { get; set; }

        public string? AuthorName { get; set; }

        public string? ImageCredit { get; set; }
        public required string ImageSrc { get; set; }

        public required string Description { get; set; }
        public double Price { get; set; }

        public ICollection<ProductRelatedWord> ProductRelatedWords { get; set; } = [];
    }

}