import {InMemoryDbService, RequestInfo, ParsedUrl} from 'angular-in-memory-web-api';
import {RequestMethod, ResponseOptions, URLSearchParams} from '@angular/http';
import {Report} from './reports/models/report';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const DispatchesByMonth =
      [
        {
          'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-1',
          'label': '2016-01',
          'value': 250
        }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-2',
        'label': '2016-02',
        'value': 355
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-3',
        'label': '2016-03',
        'value': 579
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-4',
        'label': '2016-04',
        'value': 992
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-5',
        'label': '2016-05',
        'value': 837
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-6',
        'label': '2016-06',
        'value': 833
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-7',
        'label': '2016-07',
        'value': 803
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-8',
        'label': '2016-08',
        'value': 799
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-9',
        'label': '2016-09',
        'value': 667
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-10',
        'label': '2016-10',
        'value': 483
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-11',
        'label': '2016-11',
        'value': 422
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-12',
        'label': '2016-12',
        'value': 296
      }];
    const DispatchesByJob =
      [
        {
          'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-83',
          'label': 'Advanced Gardening',
          'value': 41
        }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-74',
        'label': 'Basic House Cleaning',
        'value': 54
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-64',
        'label': 'Build retaining wall- Landscaping',
        'value': 1
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-65',
        'label': 'Carpentry  Framing and Cabinetry',
        'value': 15
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-67',
        'label': 'Deep and/or Move in/out Cleaning',
        'value': 59
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-77',
        'label': 'Demolition',
        'value': 29
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-122',
        'label': 'Digging',
        'value': 48
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-63',
        'label': 'Drywall - Hanging Sheetrock',
        'value': 8
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-133',
        'label': 'Drywall - Taping and Sanding',
        'value': 11
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-60',
        'label': 'General Labor',
        'value': 10
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-128',
        'label': 'Hauling',
        'value': 55
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-131',
        'label': 'Insulation',
        'value': 6
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-88',
        'label': 'Landscaping',
        'value': 12
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-68',
        'label': 'Moving Furniture and Boxes',
        'value': 100
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-61',
        'label': 'Painting (roller brush)',
        'value': 42
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-120',
        'label': 'Pressure Washing',
        'value': 1
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-132',
        'label': 'Tile Installation',
        'value': 3
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-69',
        'label': 'Yardwork',
        'value': 35
      }];
    const SeattleCityReport =
      [
        {
          'id': '20160101-20170101-CityReport-ESL-2016',
          'label': 'Counts of members who accessed at least 12 hours of ESL classes',
          'year': 2016,
          'Jan': 10,
          'Feb': 10,
          'Mar': 8,
          'Apr': 19,
          'May': 14,
          'Jun': 10,
          'Jul': 10,
          'Aug': 8,
          'Sep': 2,
          'Oct': 10,
          'Nov': 14,
          'Dec': 5
        },
        {
          'id': '20160101-20170101-CityReport-FinEd-2016',
          'label': 'Counts of members who accessed finanacial literacy',
          'year': 2016,
          'Jan': 0,
          'Feb': 23,
          'Mar': 0,
          'Apr': 0,
          'May': 0,
          'Jun': 0,
          'Jul': 0,
          'Aug': 0,
          'Sep': 0,
          'Oct': 0,
          'Nov': 25,
          'Dec': 0
        },
        {
          'id': '20160101-20170101-CityReport-NewEnrolls-2016',
          'label': 'Newly enrolled in program (within time range)',
          'year': 2016,
          'Jan': 178,
          'Feb': 47,
          'Mar': 50,
          'Apr': 75,
          'May': 56,
          'Jun': 51,
          'Jul': 26,
          'Aug': 22,
          'Sep': 25,
          'Oct': 30,
          'Nov': 21,
          'Dec': 23
        },
        {
          'id': '20160101-20170101-CityReport-Training-2016',
          'label': 'Counts of members who participated in job skill training or workshops',
          'year': 2016,
          'Jan': 13,
          'Feb': 33,
          'Mar': 15,
          'Apr': 25,
          'May': 12,
          'Jun': 13,
          'Jul': 2,
          'Aug': 16,
          'Sep': 10,
          'Oct': 11,
          'Nov': 22,
          'Dec': 3
        },
        {
          'id': '20160101-20170101-CityReport-UndupCount-2016',
          'label': 'A2H1-0 count of unduplicated individuals securing day labor employment this month',
          'year': 2016,
          'Jan': 92,
          'Feb': 114,
          'Mar': 138,
          'Apr': 157,
          'May': 155,
          'Jun': 157,
          'Jul': 161,
          'Aug': 146,
          'Sep': 136,
          'Oct': 125,
          'Nov': 121,
          'Dec': 103
        }
      ];
    const reports = [
      {
        'name': 'DispatchesByJob',
        'commonName': 'Dispatches by job, with some other text',
        'description': 'The number of completed dispatches, grouped by job (skill ID)',
        'sqlquery': 'SELECT\r\nconvert(varchar(24), @beginDate, 126) + "-" + convert(varchar(23), @endDate, 126) + "-" + convert(varchar(5), min(wa.skillid)) as id,\r\nlskill.text_en  AS label,\r\ncount(lskill.text_en) value\r\nFROM [dbo].WorkAssignments as WA \r\njoin [dbo].lookups as lskill on (wa.skillid = lskill.id)\r\njoin [dbo].WorkOrders as WO ON (WO.ID = WA.workorderID)\r\njoin [dbo].lookups as lstatus on (WO.status = lstatus.id) \r\nWHERE wo.dateTimeOfWork < (@endDate) \r\nand wo.dateTimeOfWork > (@beginDate)\r\nand lstatus.text_en = "Completed"\r\ngroup by lskill.text_en',
        'category': 'Dispatches',
        'subcategory': null,
        'idString': 'reportdef',
        'id': 1,
        'data': DispatchesByJob,
        'datecreated': '2017-05-05T10:21:16.957',
        'dateupdated': '2017-05-05T10:21:16.957',
        'createdby': 'Init T. Script',
        'updatedby': 'Init T. Script',
        'idPrefix': 'reportdef1-',
        'inputs': {
          'beginDate': true,
          'endDate': true,
          'memberNumber': true
        },
        'columns': [
          {
            'field': 'id',
            'header': 'id',
            'visible': false
          },
          {
            'field': 'label',
            'header': 'label',
            'visible': true
          },
          {
            'field': 'value',
            'header': 'value',
            'visible': true
          }
        ]
      },
      {
        'name': 'DispatchesByMonth',
        'title': 'A different title for Dispatches by Month',
        'commonName': 'Dispatches by Month, (weee!)',
        'description': 'The number of completed dispatches, grouped by month',
        'sqlquery': 'SELECT\r\nconvert(varchar(23), @beginDate, 126) + "-" + convert(varchar(23), @endDate, 126) + "-" + convert(varchar(5), month(min(wo.datetimeofwork))) as id,\r\nconvert(varchar(7), min(wo.datetimeofwork), 126)  AS label,\r\ncount(*) value\r\nfrom workassignments wa\r\njoin workorders wo on wo.id = wa.workorderid\r\njoin lookups l on wo.status = l.id\r\nwhere  datetimeofwork >= @beginDate\r\nand datetimeofwork < @endDate\r\nand l.text_en = "Completed"\r\nand wa.workerassignedid is not null\r\ngroup by month(wo.datetimeofwork)',
        'category': 'Dispatches',
        'subcategory': null,
        'idString': 'reportdef',
        'id': 2,
        'data': DispatchesByMonth,
        'datecreated': '2017-05-05T10:21:16.997',
        'dateupdated': '2017-05-05T10:21:16.997',
        'createdby': 'Init T. Script',
        'updatedby': 'Init T. Script',
        'idPrefix': 'reportdef2-',
        'inputs': {
          'beginDate': false,
          'endDate': false,
          'memberNumber': true
        },
        'columns': [
          {
            'field': 'id',
            'header': 'id',
            'visible': false
          },
          {
            'field': 'label',
            'header': 'label',
            'visible': true
          },
          {
            'field': 'value',
            'header': 'value',
            'visible': true
          }
        ]
      },
      {
        'name': 'SeattleCityReport',
        'id': 21,
        'title': null,
        'commonName': 'Seattle City report',
        'description': 'Casa Latina\'s monthly numbers for the City of Seattle',
        'sqlquery': 'select\r\nconvert(varchar(8), @beginDate, 112) + \'-\' + convert(varchar(8), @endDate, 112) + \'-CityReport-NewEnrolls-\' + convert(varchar(4), [year]) as id, \r\n    \'Newly enrolled in program (within time range)\' as label, \r\n    cast(year as int) as year, \r\n\tcast([1] as int) as \'Jan\', \r\n\tcast([2] as int) as \'Feb\', \r\n\tcast([3] as int) as \'Mar\', \r\n\tcast([4] as int) as \'Apr\',\r\n\tcast([5] as int) as \'May\', \r\n\tcast([6] as int) as \'Jun\', \r\n\tcast([7] as int) as \'Jul\', \r\n\tcast([8] as int) as \'Aug\',\r\n\tcast([9] as int) as \'Sep\', \r\n\tcast([10] as int) as \'Oct\', \r\n\tcast([11] as int) as \'Nov\', \r\n\tcast([12] as int) as \'Dec\'\r\nfrom\r\n(\r\n\tselect min(year(signindate)) as year, min(month(signindate)) as month, cardnum\r\n\tfrom \r\n\t(\r\n\t\tSELECT MIN(dateforsignin) AS signindate, dwccardnum as cardnum\r\n\t\tFROM dbo.WorkerSignins\r\n\t\tWHERE dateforsignin >= @startdate AND\r\n\t\tdateforsignin < @EnDdate\r\n\t\tGROUP BY dwccardnum\r\n\r\n\t\tunion \r\n\r\n\t\tselect min(dateforsignin) as singindate, dwccardnum as cardnum\r\n\t\tfrom activitysignins asi\r\n\t\twhere dateforsignin >= @startdate\r\n\t\tand dateforsignin < @enddate\r\n\t\tgroup by dwccardnum\r\n\t) \r\n\tas result_set\r\n\tgroup by  cardnum\r\n) as foo\r\nPIVOT  \r\n(  \r\ncount (cardnum)  \r\nFOR month IN  \r\n( [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] )  \r\n) AS pvt \r\n\r\nunion \r\n\r\nselect\r\nconvert(varchar(8), @beginDate, 112) + \'-\' + convert(varchar(8), @endDate, 112) + \'-CityReport-FinEd-\' + convert(varchar(4), [year]) as id, \r\n    \'Counts of members who accessed finanacial literacy\' as label, \r\n    cast(year as int) as year, \r\n\tcast([1] as int) as \'Jan\', \r\n\tcast([2] as int) as \'Feb\', \r\n\tcast([3] as int) as \'Mar\', \r\n\tcast([4] as int) as \'Apr\',\r\n\tcast([5] as int) as \'May\', \r\n\tcast([6] as int) as \'Jun\', \r\n\tcast([7] as int) as \'Jul\', \r\n\tcast([8] as int) as \'Aug\',\r\n\tcast([9] as int) as \'Sep\', \r\n\tcast([10] as int) as \'Oct\', \r\n\tcast([11] as int) as \'Nov\', \r\n\tcast([12] as int) as \'Dec\'\r\nfrom\r\n(\r\n\tselect min(year(signindate)) as year, min(month(signindate)) as month, cardnum\r\n\tfrom \r\n\t(\r\n\t\tSELECT ASIs.dwccardnum as cardnum, MIN(dateStart) as signindate\r\n\t\tFROM dbo.Activities Acts\r\n\t\tJOIN dbo.ActivitySignins ASIs ON Acts.ID = ASIs.ActivityID\r\n\t\tJOIN dbo.Lookups Ls ON Acts.name = Ls.ID\r\n\t\tWHERE Ls.ID = 179 AND dateStart >= @beginDate AND dateStart <= @endDate\r\n\r\n\t\tGROUP BY ASIs.dwccardnum\r\n\t) \r\n\tas result_set\r\n\tgroup by  cardnum\r\n) as foo\r\nPIVOT  \r\n(  \r\ncount (cardnum)  \r\nFOR month IN  \r\n( [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] )  \r\n) AS pvt \r\n\r\nunion \r\n\r\nselect\r\nconvert(varchar(8), @beginDate, 112) + \'-\' + convert(varchar(8), @endDate, 112) + \'-CityReport-Training-\' + convert(varchar(4), [year]) as id, \r\n    \'Counts of members who participated in job skill training or workshops\' as label, \r\n    cast(year as int) as year, \r\n\tcast([1] as int) as \'Jan\', \r\n\tcast([2] as int) as \'Feb\', \r\n\tcast([3] as int) as \'Mar\', \r\n\tcast([4] as int) as \'Apr\',\r\n\tcast([5] as int) as \'May\', \r\n\tcast([6] as int) as \'Jun\', \r\n\tcast([7] as int) as \'Jul\', \r\n\tcast([8] as int) as \'Aug\',\r\n\tcast([9] as int) as \'Sep\', \r\n\tcast([10] as int) as \'Oct\', \r\n\tcast([11] as int) as \'Nov\', \r\n\tcast([12] as int) as \'Dec\'\r\nfrom\r\n(\r\n\tselect min(year(signindate)) as year, min(month(signindate)) as month, cardnum\r\n\tfrom \r\n\t(\r\n\t\tSELECT ASIs.dwccardnum as cardnum, MIN(dateStart) as signindate\r\n\t\tFROM dbo.Activities Acts\r\n\t\tJOIN dbo.ActivitySignins ASIs ON Acts.ID = ASIs.ActivityID\r\n\t\tJOIN dbo.Lookups Ls ON Acts.name = Ls.ID\r\n\t\tWHERE dateStart >= @startdate AND dateStart <= @enddate AND\r\n\t\t(Ls.ID = 182 OR Ls.ID = 181 OR Ls.ID = 180\r\n\t\tOR Ls.ID = 179 OR Ls.ID = 178 OR Ls.ID = 134\r\n\t\tOR Ls.ID = 168 OR Ls.ID = 156 OR Ls.ID = 152\r\n\t\tOR Ls.ID = 145 OR Ls.ID = 135 OR Ls.ID = 104)\r\n\r\nGROUP BY dwccardnum\r\n\t) \r\n\tas result_set\r\n\tgroup by  cardnum\r\n) as foo\r\nPIVOT  \r\n(  \r\ncount (cardnum)  \r\nFOR month IN  \r\n( [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] )  \r\n) AS pvt \r\n\r\nunion \r\n\r\nselect\r\nconvert(varchar(8), @beginDate, 112) + \'-\' + convert(varchar(8), @endDate, 112) + \'-CityReport-ESL-\' + convert(varchar(4), [year]) as id, \r\n    \'Counts of members who accessed at least 12 hours of ESL classes\' as label, \r\n    cast(year as int) as year, \r\n\tcast([1] as int) as \'Jan\', \r\n\tcast([2] as int) as \'Feb\', \r\n\tcast([3] as int) as \'Mar\', \r\n\tcast([4] as int) as \'Apr\',\r\n\tcast([5] as int) as \'May\', \r\n\tcast([6] as int) as \'Jun\', \r\n\tcast([7] as int) as \'Jul\', \r\n\tcast([8] as int) as \'Aug\',\r\n\tcast([9] as int) as \'Sep\', \r\n\tcast([10] as int) as \'Oct\', \r\n\tcast([11] as int) as \'Nov\', \r\n\tcast([12] as int) as \'Dec\'\r\nfrom\r\n(\r\n\tselect year, month, cardnum\r\n\tfrom \r\n\t(\r\n\t\t\tSELECT  year(dateStart) as year, month(datestart) as month, dwccardnum as cardnum,\r\n\t\t\tsum(DATEDIFF( minute, dateStart, dateEnd )) as Minutes\r\n\t\t\tfrom dbo.Activities Acts\r\n\r\n\t\t\tJOIN dbo.Lookups Ls ON Acts.name = Ls.ID\r\n\t\t\tJOIN dbo.ActivitySignins ASIs ON Acts.ID = ASIs.ActivityID\r\n\t\t\tWHERE text_en LIKE \'%English%\'\r\n\t\t\tAND dateStart >= @startdate AND dateend <= @EnDdate\r\n\t\t\tgroup by year(datestart), month(datestart), dwccardnum\r\n\t) as foo\r\n\twhere foo.minutes >= 720\r\n\r\n) as foo\r\nPIVOT  \r\n(  \r\ncount (cardnum)  \r\nFOR month IN  \r\n( [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] )  \r\n) AS pvt\r\n\r\nunion \r\n\r\nselect\r\nconvert(varchar(8), @beginDate, 112) + \'-\' + convert(varchar(8), @endDate, 112) + \'-CityReport-UndupCount-\' + convert(varchar(4), [year]) as id, \r\n\r\n    \'A2H1-0 count of unduplicated individuals securing day labor employment this month\' as label, \r\n    cast(year as int) as year, \r\n\tcast([1] as int) as \'Jan\', \r\n\tcast([2] as int) as \'Feb\', \r\n\tcast([3] as int) as \'Mar\', \r\n\tcast([4] as int) as \'Apr\',\r\n\tcast([5] as int) as \'May\', \r\n\tcast([6] as int) as \'Jun\', \r\n\tcast([7] as int) as \'Jul\', \r\n\tcast([8] as int) as \'Aug\',\r\n\tcast([9] as int) as \'Sep\', \r\n\tcast([10] as int) as \'Oct\', \r\n\tcast([11] as int) as \'Nov\', \r\n\tcast([12] as int) as \'Dec\'\r\nfrom\r\n(\r\n\tSELECT count(distinct(dwccardnum)) AS cardnum, year(dateTimeofWork) as year, month(dateTimeofWork) AS month\r\n\tfrom dbo.WorkAssignments WAs\r\n\tJOIN dbo.WorkOrders WOs ON WAs.workOrderID = WOs.ID\r\n\tJOIN dbo.Workers Ws on WAs.workerAssignedID = Ws.ID\r\n\tjoin dbo.lookups l on l.id = wos.status\r\n\tWHERE dateTimeofWork >= @startdate \r\n\tand dateTimeofWork <= @EnDdate\r\n\tand l.text_EN = \'Completed\'\r\n\tgroup by year(dateTimeofWork), month(dateTimeofWork)\r\n\r\n) as foo\r\nPIVOT  \r\n(  \r\nsum (cardnum)  \r\nFOR month IN  \r\n( [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12] )  \r\n) AS pvt',
        'category': 'site-specific',
        'subcategory': null,
        'data': SeattleCityReport,
        'inputs': {
          'beginDate': true,
          'endDate': true,
          'memberNumber': false
        },
        'columns': [
          {
            'field': 'id',
            'header': 'id',
            'visible': false
          },
          {
            'field': 'label',
            'header': 'label',
            'visible': true
          },
          {
            'field': 'year',
            'header': 'year',
            'visible': true
          },
          {
            'field': 'Jan',
            'header': 'Jan',
            'visible': true
          },
          {
            'field': 'Feb',
            'header': 'Feb',
            'visible': true
          },
          {
            'field': 'Mar',
            'header': 'Mar',
            'visible': true
          },
          {
            'field': 'Apr',
            'header': 'Apr',
            'visible': true
          },
          {
            'field': 'May',
            'header': 'May',
            'visible': true
          },
          {
            'field': 'Jun',
            'header': 'Jun',
            'visible': true
          },
          {
            'field': 'Jul',
            'header': 'Jul',
            'visible': true
          },
          {
            'field': 'Aug',
            'header': 'Aug',
            'visible': true
          },
          {
            'field': 'Sep',
            'header': 'Sep',
            'visible': true
          },
          {
            'field': 'Oct',
            'header': 'Oct',
            'visible': true
          },
          {
            'field': 'Nov',
            'header': 'Nov',
            'visible': true
          },
          {
            'field': 'Dec',
            'header': 'Dec',
            'visible': true
          }
        ]
      }
    ];
    const Activities = [
      {
        'name': 'ID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      },
      {
        'name': 'name',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      },
      {
        'name': 'type',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      },
      {
        'name': 'dateStart',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      },
      {
        'name': 'dateEnd',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      },
      {
        'name': 'teacher',
        'is_nullable': false,
        'system_type_name': 'nvarchar(max)',
        'include': true
      },
      {
        'name': 'notes',
        'is_nullable': true,
        'system_type_name': 'nvarchar(4000)',
        'include': true
      },
      {
        'name': 'datecreated',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      },
      {
        'name': 'dateupdated',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      },
      {
        'name': 'Createdby',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      },
      {
        'name': 'Updatedby',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      },
      {
        'name': 'recurring',
        'is_nullable': false,
        'system_type_name': 'bit',
        'include': true
      },
      {
        'name': 'firstID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      },
      {
        'name': 'nameEN',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      },
      {
        'name': 'nameES',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      },
      {
        'name': 'typeEN',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      },
      {
        'name': 'typeES',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      }
    ];
    const ActivitySignins = [
      {
        'name': 'ID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'ActivityID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'dwccardnum',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'memberStatus',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'dateforsignin',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'datecreated',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'dateupdated',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'Createdby',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      }, {
        'name': 'Updatedby',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      }, {
        'name': 'personID',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'timeZoneOffset',
        'is_nullable': false,
        'system_type_name': 'float',
        'include': true
      }];
    const Workers = [
      {
        'name': 'ID', 'is_nullable': false, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'typeOfWorkID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'dateOfMembership', 'is_nullable': false, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'dateOfBirth',
        'is_nullable': true,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'memberStatus', 'is_nullable': false, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'memberReactivateDate',
        'is_nullable': true,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'active', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'RaceID',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'raceother', 'is_nullable': true, 'system_type_name': 'nvarchar(20)', 'include': true
      }, {
        'name': 'height',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      }, {
        'name': 'weight', 'is_nullable': true, 'system_type_name': 'nvarchar(10)', 'include': true
      }, {
        'name': 'englishlevelID',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'recentarrival', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'dateinUSA',
        'is_nullable': true,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'dateinseattle', 'is_nullable': true, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'disabled',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'disabilitydesc', 'is_nullable': true, 'system_type_name': 'nvarchar(50)', 'include': true
      }, {
        'name': 'maritalstatus',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'livewithchildren', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'numofchildren',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'incomeID', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'livealone',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'emcontUSAname', 'is_nullable': true, 'system_type_name': 'nvarchar(50)', 'include': true
      }, {
        'name': 'emcontUSArelation',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      }, {
        'name': 'emcontUSAphone', 'is_nullable': true, 'system_type_name': 'nvarchar(14)', 'include': true
      }, {
        'name': 'dwccardnum',
        'is_nullable': false,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'neighborhoodID', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'immigrantrefugee',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'countryoforiginID', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'emcontoriginname',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true

      }, {
        'name': 'emcontoriginrelation',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true

      }, {
        'name': 'emcontoriginphone',
        'is_nullable': true,
        'system_type_name': 'nvarchar(14)',
        'include': true
      }, {
        'name': 'memberexpirationdate', 'is_nullable': false, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'driverslicense',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'licenseexpirationdate', 'is_nullable': true, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'carinsurance',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'insuranceexpiration', 'is_nullable': true, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'ImageID',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'skill1', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'skill2',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'skill3', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'datecreated',
        'is_nullable': false,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'dateupdated', 'is_nullable': false, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'Createdby',
        'is_nullable': true,
        'system_type_name': 'nvarchar(30)',
        'include': true
      }, {
        'name': 'Updatedby', 'is_nullable': true, 'system_type_name': 'nvarchar(30)', 'include': true
      }, {
        'name': 'homeless',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'workerRating', 'is_nullable': true, 'system_type_name': 'real', 'include': true
      }, {
        'name': 'housingType',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'liveWithSpouse', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'liveWithDescription',
        'is_nullable': true,
        'system_type_name': 'nvarchar(1000)',
        'include': true
      }, {
        'name': 'americanBornChildren', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'numChildrenUnder18',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'educationLevel', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'farmLaborCharacteristics',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'wageTheftVictim', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'wageTheftRecoveryAmount',
        'is_nullable': true,
        'system_type_name': 'float',
        'include': true
      }, {
        'name': 'lastPaymentDate', 'is_nullable': true, 'system_type_name': 'datetime', 'include': true
      }, {
        'name': 'lastPaymentAmount',
        'is_nullable': true,
        'system_type_name': 'float',
        'include': true
      }, {
        'name': 'ownTools', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'healthInsurance',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'usVeteran', 'is_nullable': true, 'system_type_name': 'bit', 'include': true
      }, {
        'name': 'healthInsuranceDate',
        'is_nullable': true,
        'system_type_name': 'datetime',
        'include': true
      }, {
        'name': 'vehicleTypeID', 'is_nullable': true, 'system_type_name': 'int', 'include': true
      }, {
        'name': 'incomeSourceID',
        'is_nullable': true,
        'system_type_name': 'int',
        'include': true
      }, {
        'name': 'introToCenter', 'is_nullable': true, 'system_type_name': 'nvarchar(1000)', 'include': true
      }, {
        'name': 'lgbtq',
        'is_nullable': true,
        'system_type_name': 'bit',
        'include': true
      }, {
        'name': 'typeOfWork', 'is_nullable': true, 'system_type_name': 'nvarchar(max)', 'include': true
      }, {
        'name': 'memberStatusEN',
        'is_nullable': true,
        'system_type_name': 'nvarchar(50)',
        'include': true
      }, {
        'name': 'memberStatusES', 'is_nullable': true, 'system_type_name': 'nvarchar(50)', 'include': true
      }, {
        'name': 'fullNameAndID',
        'is_nullable': true,
        'system_type_name': 'nvarchar(100)',
        'include': true
      }, {
        'name': 'skillCodes', 'is_nullable': true, 'system_type_name': 'nvarchar(max)', 'include': true
      }];
    const exports = [
      {
        'id': 'activities', // needed for in-memory db, not real
        'name': 'Activities',
        'data': Activities
      },
      {
        'id': 'activitysignins', // needed for in-memory db, not real
        'name': 'ActivitySignins',
        'data': ActivitySignins
      },
      {
        id: 'workers',
        name: 'Workers',
        data: Workers
      }
    ];

    return {exports, reports};
  }

  // intercept response from the default HTTP method handlers
  responseInterceptor(response: ResponseOptions, reqInfo: RequestInfo) {
    response.body = (<any[]>response.body); // matches web api controller
    const method = RequestMethod[reqInfo.req.method].toUpperCase();
    const body = JSON.stringify(response.body);
    // console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
    console.log(`responseInterceptor: ${method} ${reqInfo.req.url}`);
    if (typeof reqInfo.query === 'object') {
      // if query parameters present, replace object w/ data key's value.
      // useful for testing; matches API behavior
      response.body = (<any>response.body).data;
    }
    if (reqInfo.req.url === '/api/exports/Activities' ||
      reqInfo.req.url === '/api/exports/activities' ||
      reqInfo.req.url === '/api/exports/activitysignins' ||
      reqInfo.req.url === '/api/exports/workers') {
      response.body = (<any>response.body).data;
    }
    return response;
  }

  parseUrl(url: string): ParsedUrl {
    try {
      const loc = this.getLocation(url);
      let drop = 0;
      let urlRoot = '';
      if (loc.host !== undefined) {
        // url for a server on a different host!
        // assume it's collection is actually here too.
        drop = 1; // the leading slash
        urlRoot = loc.protocol + '//' + loc.host + '/';
      }
      const path = loc.pathname.substring(drop);
      let [base, collectionName, id] = path.split('/');
      const resourceUrl = urlRoot + base + '/' + collectionName + '/';
      [collectionName] = collectionName.split('.'); // ignore anything after the '.', e.g., '.json'
      const query = loc.search && new URLSearchParams(loc.search.substr(1));

      const result = {base, collectionName, id, query, resourceUrl};
      console.log('parsedUrl: ' + JSON.stringify(result));
      return result;
    } catch (err) {
      const msg = `unable to parse url '${url}'; original error: ${err.message}`;
      throw new Error(msg);
    }
  }

  private getLocation(href: string) {
    const l = document.createElement('a');
    l.href = href;
    return l;
  };
}
