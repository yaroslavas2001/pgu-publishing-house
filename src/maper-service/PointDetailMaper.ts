import PointDetailItem from "@/api/dataSource/api/plugins/models/controllersModels/points/PointDetailItem";
import PointDetailMapper from "@/api/dataSource/api/plugins/models/mapModel/points/PointDetailMaperModel"
export default class PointMapper {
    static fromServerModel(r: PointDetailItem): PointDetailMapper {
        return new PointDetailMapper({
            Address: {
                Region: {
                    Id: r.Address.Region.Id,
                    Name: r.Address.Region.Name,
                    Code: r.Address.Region.Code
                },
                Territory: r.Address.Territory,
                District: r.Address.District,
                Settlement: {
                    Name: r.Address.Settlement?.Name,
                    Type: {
                        Name: r.Address.Settlement?.Type.Name,
                        Id: r.Address.Settlement?.Type.Id,
                        ShortName: r.Address.Settlement?.Type.ShortName
                    }
                },
                Street: {
                    Name: r.Address.Street?.Name,
                    Type: {
                        Id: r.Address.Street?.Type.Id,
                        Name: r.Address.Street?.Type.Name,
                        ShortName: r.Address.Street?.Type.ShortName
                    }
                },
                Building: {
                    Number: r.Address.Building?.Number,
                    NumberAdditional: r.Address.Building?.NumberAdditional,
                    Type: {
                        Id: r.Address.Building?.Type.Id,
                        Name: r.Address.Building?.Type.Name,
                        ShortName: r.Address.Building?.Type.ShortName
                    }
                },
                Apartment: {
                    Type: {
                        Id: r.Address.Apartment?.Type.Id
                    }
                },
                Zip: r.Address.Zip,
            },
            DeviceType: {
                Id: r.DeviceType.Id,
                Name: r.DeviceType.Name
            },
            Editor: {
                UserEnts: r.Editor.UserEnts,
                Avatar: r.Editor.Avatar,
                BelongsToGroups: r.Editor.BelongsToGroups,
                DateChange: r.Editor.DateChange,
                Editor: r.Editor.Editor,
                Email: r.Editor.Email,
                Enterprise: r.Editor.Enterprise,
                EnterpriseId: r.Editor.EnterpriseId,
                Fax: r.Editor.Fax,
                FullName: r.Editor.FullName,
                GoogleAuthSecretKey: r.Editor.GoogleAuthSecretKey,
                Id: r.Editor.Id,
                IsBackOfficeUser: r.Editor.IsBackOfficeUser,
                IsBlocked: r.Editor.IsBlocked,
                IsContactOnly: r.Editor.IsContactOnly,
                IsPrepaid: r.Editor.IsPrepaid,
                IsRewardCalc: r.Editor.IsRewardCalc,
                IsShopUser: r.Editor.IsShopUser,
                MobilePhone: r.Editor.MobilePhone,
                Name: r.Editor.Name,
                Notes: r.Editor.Notes,
                Password: r.Editor.Password,
                Phone: r.Editor.Phone,
                Rights: r.Editor.Rights,
                ShopIds: r.Editor.ShopIds,
                State: r.Editor.State,
                TrnCopySumLimit: r.Editor.TrnCopySumLimit,
                UserName: r.Editor.UserName,
                UserShops: r.Editor.UserShops,
            },
            Shop: {
                Id: r.Shop.Id,
                Code: r.Shop.Code,
                Name: r.Shop.Name,
                FullName: r.Shop.FullName,
                Enterprise: {
                    State: r.Shop.Enterprise.State,
                    TimeDifferenceHours: r.Shop.Enterprise.TimeDifferenceHours,
                    QlaunchOperators: r.Shop.Enterprise.QlaunchOperators,
                    PosCode: r.Shop.Enterprise.PosCode,
                    Shops: r.Shop.Enterprise.Shops,
                    PaymentType: r.Shop.Enterprise.PaymentType,
                    Operators: r.Shop.Enterprise.Operators,
                    NdsCodeDe: r.Shop.Enterprise.NdsCodeDe,
                    EntCodeDe: r.Shop.Enterprise.EntCodeDe,
                    Code: r.Shop.Enterprise.Code,
                    ContractDate: r.Shop.Enterprise.ContractDate,
                    ContractNumber: r.Shop.Enterprise.ContractNumber,
                    Account: r.Shop.Enterprise.Account,
                    Account2: r.Shop.Enterprise.Account2,
                    Id: r.Shop.Enterprise.Id,
                    IsBlocked: r.Shop.Enterprise.IsBlocked,
                    IsNdsPayer: r.Shop.Enterprise.IsNdsPayer,
                    IsMini: r.Shop.Enterprise.IsMini,
                    Name: r.Shop.Enterprise.Name,
                    FullName: r.Shop.Enterprise.FullName,
                    Address: r.Shop.Enterprise.Address,
                    PostAddress: r.Shop.Enterprise.PostAddress,
                    Phone: r.Shop.Enterprise.Phone,
                    Fax: r.Shop.Enterprise.Fax,
                    Email: r.Shop.Enterprise.Email,
                    BankRequisite: r.Shop.Enterprise.BankRequisite,
                    BillingType: r.Shop.Enterprise.BillingType,
                    Inn: r.Shop.Enterprise.Inn,
                    Kpp: r.Shop.Enterprise.Kpp,
                    CashRegister: r.Shop.Enterprise.CashRegister,
                    TimeDifference: r.Shop.Enterprise.TimeDifference,
                    FullPayment: r.Shop.Enterprise.FullPayment,
                    AddBalanceType: r.Shop.Enterprise.AddBalanceType,
                    RewardFromPayPercent: r.Shop.Enterprise.RewardFromPayPercent,
                    RewardFromPayAmount: r.Shop.Enterprise.RewardFromPayAmount,
                    InsuredLimit: r.Shop.Enterprise.InsuredLimit,
                    InsuredBlockSum: r.Shop.Enterprise.InsuredBlockSum,
                    InsuredBlockPrice: r.Shop.Enterprise.InsuredBlockPrice,
                    InsuredBlockEndDate: r.Shop.Enterprise.InsuredBlockEndDate,
                    IsVerified: r.Shop.Enterprise.IsVerified,
                    DaysForPay: r.Shop.Enterprise.DaysForPay,
                    AgreementAmount: r.Shop.Enterprise.AgreementAmount,
                    ExtraLimit: r.Shop.Enterprise.ExtraLimit,
                    ReportSendPeriodicity: r.Shop.Enterprise.ReportSendPeriodicity,
                    EmoneyRegistrationCoast: r.Shop.Enterprise.EmoneyRegistrationCoast,
                    IsCreatePayment: r.Shop.Enterprise.IsCreatePayment,
                    LastReportDate: r.Shop.Enterprise.LastReportDate,
                    ReportSendTime: r.Shop.Enterprise.ReportSendTime,
                    ChildEntIdList: r.Shop.Enterprise.ChildEntIdList,
                    AllowedCurrencyList: r.Shop.Enterprise.AllowedCurrencyList,
                    SignaturePosition: r.Shop.Enterprise.SignaturePosition,
                    SignatureFIO: r.Shop.Enterprise.SignatureFIO,
                    ChiefAccountantFio: r.Shop.Enterprise.ChiefAccountantFio,
                    CuratorFio: r.Shop.Enterprise.CuratorFio,
                    InsertEncashmentPayment: r.Shop.Enterprise.InsertEncashmentPayment,
                    ChangeTranDate: r.Shop.Enterprise.ChangeTranDate,
                    ShowInReport: r.Shop.Enterprise.ShowInReport,
                    BalanceRecalc: r.Shop.Enterprise.BalanceRecalc,
                    ActHeader: r.Shop.Enterprise.ActHeader,
                    EmailSendPeriodicity: r.Shop.Enterprise.EmailSendPeriodicity,
                    Notes: r.Shop.Enterprise.Notes,
                    DateAdd: r.Shop.Enterprise.DateAdd,
                    DateChange: r.Shop.Enterprise.DateChange,
                    ProvisionModel: r.Shop.Enterprise.ProvisionModel,
                    IsBalanceFromLastAct: r.Shop.Enterprise.IsBalanceFromLastAct,
                    Editor: r.Shop.Enterprise.Editor,
                    MaxLimitSize: r.Shop.Enterprise.MaxLimitSize
                },

                Agent: { Id: r.Shop.Agent?.Id },
                Represantative: {
                    Id: r.Shop.Represantative?.Id
                },
                BrendName: r.Shop.BrendName,
                Address: r.Shop.Address,
                Phone: r.Shop.Phone,
                Fax: r.Shop.Fax,
                BillingType: r.Shop.BillingType,
                Notes: r.Shop.Notes,
                DateAdd: r.Shop.DateAdd,
                DateChange: r.Shop.DateChange,
                Editor: r.Shop.Editor,
                State: r.Shop.State,
            },
            Type: {
                Id: r.Type?.Id,
                Name: r.Type?.Name
            },
            Color: {
                Id: r.Color?.Id,
                Name: r.Color?.Name
            },
            PosType: {
                Id: r.PosType?.Id
            },
            IsBrsPoint: r.IsBrsPoint,
            BusinessHours: r.BusinessHours,
            Weekends: r.Weekends,
            RegistrationStatus: r.RegistrationStatus,
            ShopPosCode: r.ShopPosCode,
            BeepayPosCode: r.BeepayPosCode,
            Online: r.Online,
            BillingType: r.BillingType,
            N4AliveTimeout: r.N4AliveTimeout,
            DayLimit: r.DayLimit,
            WeekLimit: r.WeekLimit,
            MonthLimit: r.MonthLimit,
            JurAdress: r.JurAdress,
            TopAdvertise: r.TopAdvertise,
            Longtitude: r.Longtitude,
            Latitude: r.Latitude,
            TechnicianId: r.TechnicianId,
            ManagerId: r.ManagerId,
            CollectorId: r.CollectorId,
            Notes: r.Notes,
            SerialNum: r.SerialNum,
            SoftVersion: r.SoftVersion,
            N4GWVersion: r.N4GWVersion,
            Mobile: r.Mobile,
            pos_LAST_N4UPLOAD_DATE: r.pos_LAST_N4UPLOAD_DATE,
            TerminalState: r.TerminalState,
            BanknotesMaxCount: r.BanknotesMaxCount,
            DispenserUse: r.DispenserUse,
            TerminalStateComment: r.TerminalStateComment,
            TerminalPlaceComment1: r.TerminalPlaceComment1,
            CalculatedAddress: r.CalculatedAddress,
            CoinsMaxCount: r.CoinsMaxCount,
            Curator: r.Curator,
            DateChange: r.DateChange,
            IsMonitoring: r.IsMonitoring,
            Name: r.Name,
            Password: r.Password,
            PrevPosId: r.PrevPosId,
            RejectPercent: r.RejectPercent,
            Rssi: r.Rssi,
            State: r.State,
        })
    }
    static toServerModel(r: PointDetailMapper): PointDetailItem {
        return {

        };
    }

}