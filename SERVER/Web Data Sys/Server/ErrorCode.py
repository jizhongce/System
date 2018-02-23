'''
SUCCESS_CODE - SUCCESS - 200

SIGN IN ERROR
-------------
601 - NO SUCH USER

602 - PASSWORD IS NOT CORRECT

603 - PHONE IS NOT VERIFIED

-------------

SIGN UP ERROR
-------------
604 - USER ALREADY EXIST

605 - THE PHONE NUMBER IS ALREADY SIGNED UP

606 - THE PASSWORD IS NOT CORRECT Schema

607 - THE PHONE NUMBER IS NOT CORRECT SHCEMA
-------------

VERIFY ERROR
-------------
608 - THE CODE IS NOT SAME OR THE CODE IS EXPIRED

609 - THE PHONE NUMBER IS NOT CORRECT
-------------
'''

# STATUS CODE
SUCCESS_CODE = 200

NO_SUCH_USER_CODE = 601

WORNG_PASSWORD_CODE = 602

PHONE_NOT_VERIFIED_CODE = 603

USER_EXIST_CODE = 604

PHONE_EXIST_CODE = 605

WRONG_PASSWORD_SCHEMA_CODE = 606

WRONG_PHONE_SCHEMA_CODE = 607

WRONG_VERIFY_CODE = 608

PHONENUM_NOT_CORRECT = 609

DATABASE_CHANGE_PASSWORD_ERROR = 610

DATABASE_CHANGE_PHONE_ERROR = 611

SAME_PHONE_ERROR = 612