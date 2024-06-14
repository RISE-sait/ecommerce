namespace backend.Models
{
    public class ProductRelatedWord
    {
        public int Id { get; set; }
        public required string Word { get; set; }
        public ICollection<Product> Products { get; set; } = [];
    }

}