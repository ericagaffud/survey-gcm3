using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using SurveyGCM3.Models;

namespace SurveyGCM3.Controllers
{
    public class HomeController : Controller
    {
        private readonly string connectionString;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env)
        {
            _logger = logger;

            var dbPath = Path.Combine(env.ContentRootPath, "App_Data", "survey_data.db");
            connectionString = $"Data Source={dbPath}";
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult SaveSurveyAnswers([FromBody] SurveyAnswers data)
        {
            try
            {
                using var connection = new SqliteConnection(connectionString);
                connection.Open();

                string jsonData = JsonSerializer.Serialize(data);

                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO survey_data (ANSWERS) VALUES (@answers)";
                command.Parameters.AddWithValue("@answers", jsonData);

                command.ExecuteNonQuery();

                return Ok(new { message = "Survey data saved successfully." });
            }
            catch (Exception ex)
            { 
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
