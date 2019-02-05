export class Institute{
    public InstituteId:number;
    public InstituteName:String;
    public InstituteCode:String;
    public Address:String;
}

export class AdminProfile{
    public Institute:Institute;
    public FullName:String;
    public ContactNo:String;
    public Email:String;
}

export class Department
{
    public DepartmentId:number;
    public Name:String;
    public YearId:String;
}
export class AcademicYear{
    public YearId:number;
    public Name:String;
    public InstituteId:number;
}

export class Student{
    public StudentId:number;
	public FullName:String;
	public YearId:number;
	public YearName:String;
	public SemisterId:number;
	public SemisterName:String;
	public DepartmentId:number;
	public DepartmentName:String;
	public ProxyDepartmentId:number;
	public FutureYearId:number;
	public StatusId:number;
	public Status:String;
	public FutureStatusId:number;
	public Note:String;
	public ACK:boolean;
	public InstituteId:number;
	public ContactNo:String;
	public Email:String;
	public Address:string;
}

export class Faculty{
	public FacultyId:number;
	public FacultyTypeName;
	public FullName:String;
	public ContactNo:String;
	public EmailId:String;
	public Address:String;
	public Qualification:String;
	public FacultyTypeId:number;
	public DepartmentId:number;
	public DepartmentName:String;
	public InstituteId:number;
}
export class FacultyType{
	public FacultyTypeId:number;
	public Name:String;
}

export class Staff{
	public StaffId	  :number;
	public FullName	  :String;
	public ContactNo  :String;
	public EmailId	  :String;
	public Address	  :String;
	public StaffTypeId:number;
	public StaffTypeName:String;
	public InstituteId:number;
}
export class StaffType{
	public StaffTypeId:number;
	public Name:String;
}

export class DashboardVM{
	public IsSetupComplete:boolean;	
	public DepartmentId:boolean;
	public FacultyTypeId:number;
}

export class StudentDashboardVM{
	public ACKs:boolean;
	public Note:String;
	public Correction:boolean;
	public Notifications:Array<NotificationView>;
}

export class Subject{
	public SubjectId :number;
	public Name		 :String;
	public YearId	 :number;
	public YearName		:String;
	public SemisterId:number;
	public SemisterName:String;
	public Evaluation:boolean;
	public DepartmentId:number;
}

export class Semister{
	public SemisterId :number;
	public Name		  :String;
	public YearId	  :number;
	public InstituteId:number;
}

export class StudentProfile{
	public StudentId:number;
	public Institute:Institute;
	public FullName:String;
	public YearName:String;
	public SemisterName:String;
	public DepartmentName:String;
	public Status:String;
	public ContactNo:String;
	public Email:String;
	public Address:String;
}

export class FormType{
	public FormTypeId:number;
	public Name:String;
}

export class FormModel{
	public FormId		:number;
	public Title		:String;
	public YearId		:number;
	public YearName		:String;
	public DepartmentId		:number;
	public DepartmentName	:String;
	public FillStartDate:DateModel;
	public FillEndDate	:DateModel;
	public FormTypeId		:number;
	public FormTypeName	:String;
	public SemisterId		:number;
	public SemisterName	:String;
}

export class DateModel{
	public Day:number;
	public Month:number;
	public Year:number;
}

export class NotificationView {
	public NotificationViewId:number;
	public Title:String;
	public Message:String;
	public IsView:boolean;
	public NotificationType:number;
}