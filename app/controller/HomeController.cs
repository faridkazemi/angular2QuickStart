using Fiveways.Insight.Model.DTO.Cloud;
using Fiveways.Insight.Model.Entities;
using Fiveways.WebApp.Models.Common;
using Fiveways.WebApp.Models.Home;
using Fiveways.WebApp.Repository;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fiveways.WebApp.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View(new BaseModel());
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult WarmUp()
        {
            var result = new {
                CustomerCount = CustomerRepository.Customers.Count,
                PantrySheetsCount = CustomerRepository.GetCustomerPantrySheets(37).Count,
                CustomerTransactionHistoryCount = TransactionRepository.GetCustomerPurchaseHistory(37).Count
            }; 
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AuditHistory(string entity, string entityId)
        {
            var result = CloudTableRepository.GetAuditData(entity, entityId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDashboardInfo()
        {
            var allchanges = CustomerPriceRepository.GetPriceChanges();
            var model = new DashboardInfoModel {
                CustomerPriceChangesCount = allchanges.Count(x => x.Status == CustomerPriceChangeStatus.New),
                CustomerPriceSubmittedCount = allchanges.Count(x => x.Status == CustomerPriceChangeStatus.Submited),
                CustomerPriceRejectedCount = allchanges.Count(x => x.Status == CustomerPriceChangeStatus.Rejected)
            };
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        #region Notes

        [HttpGet]
        public JsonResult Notes(string entity, string entityId)
        {
            var result = CloudTableRepository.GetNotes(entity, entityId);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Notes(string entity, string entityId, string content)
        {
            CloudTableRepository.AddNote(entity, entityId, content);
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Attachments

        [HttpGet]
        public JsonResult Attachments(string entity, string entityId)
        {
            var attachment = CloudTableRepository.GetAttachments(entity, entityId);
            var result = new {
                Attachment = attachment ?? new AttachmentDTO(),
                AttachmentTypeList = LookupRepository.AttachmentTypeList.FirstOrDefault(x => x.Entity == entity)?.Types
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Attachments(string entity, string entityId, string attachmentType, HttpPostedFileBase file)
        {
            CloudTableRepository.AddAttachment(entity, entityId, attachmentType, file);
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public FileResult DownloadAttachment(string url, string filename)
        {
            var content = CloudTableRepository.DownloadAttachment(url);
            var response = File(content, "application/octet-stream", filename);
            return response;
        }

        #endregion

    }
}